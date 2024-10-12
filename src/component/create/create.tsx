/** @format */

import React, { useState, ChangeEvent, FormEvent } from "react";
import "./create.css";
import Job_box from "../Jobs_box/job_box"; // PascalCase for components
import { Link } from "react-router-dom";
import Job_box_p from "../jobs_box_p/Job_box_p"; // PascalCase for components
import "../costom_styles/animation.css";
import { MdArrowBackIos, MdCancel, MdDone, MdError } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Loadingx from "../LoadingF/secoundLoading";
import states from "../../local_data/states";

// Define types
type FormState = {
  thumnail: string;
  title: string;
  description: string;
  contact_num: string;
  price: number;
  state: string;
  LGA: string;
  country: string;
  type: string;
};

type Location = {
  lat: number;
  lon: number;
};

type Error = {
  errostate: boolean;
  erromesage: string;
  field: string;
};

const Create: React.FC = () => {
  const [postcomplete, setPostComplete] = useState({
    nosuccess: false,
    success: false,
  });
  const [post, setPost] = useState<Record<string, any>>({});
  const [prevImage, setPrevImage] = useState<string>("");
  const [stage, setStage] = useState<number>(1);
  const [serverMessage, setServerMessage] = useState<string>("");
  const [loadingx, setLoadingx] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    thumnail: "",
    title: "",
    description: "",
    contact_num: "+234",
    price: 10,
    state: "",
    LGA: "",
    country: "nigeria",
    type: "casual_job",
  });
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<Location>({
    lat: 11111,
    lon: 10000,
  });
  const [progress, setProgress] = useState<number>(0);

  const erro: Error = {
    errostate: true,
    erromesage: `you cannot submit an empty form`,
    field: "",
  };

  const stateElement = states.map((data, key) => (
    <option value={data} key={key}>
      {data}
    </option>
  ));

  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.id;
    setForm((prev) => ({ ...prev, type: value }));
  };

  const reduceProgress = () => {
    setProgress((prevProgress) => prevProgress - 25);
  };

  const increaseProgress = () => {
    setProgress((prevProgress) => prevProgress + 25);
  };

  const next = (e: FormEvent) => {
    e.preventDefault();
    increaseProgress();
    setStage((prevStage) => (prevStage < 4 ? prevStage + 1 : prevStage));
  };

  const back = (e: FormEvent) => {
    e.preventDefault();
    reduceProgress();
    setStage((prevStage) => (prevStage > 1 ? prevStage - 1 : prevStage));
  };

  const getImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setPrevImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const geolocation = async (address: string): Promise<void> => {
    await console.log("location data...");
    const apiKey = "your-api-key";
    try {
      const response = await fetch(
        `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
          address
        )}&apiKey=${apiKey}`
      );
      const data = await response.json();
      const { lat, lng } = data.items[0].position;
      setLocation({ lat, lon: lng });
    } catch (error) {
      console.error(error);
    }
  };

  const bundleData = () => {
    console.log("bundling data...");
    const formData = new FormData();
    if (image) formData.append("file", image);
    formData.append("title", form.title.toLowerCase());
    formData.append("description", form.description);
    formData.append("contact_num", form.contact_num);
    formData.append("price", form.price.toString());
    formData.append("state", form.state);
    formData.append("country", form.country.toLowerCase());
    formData.append("LGA", form.LGA);
    formData.append("type", form.type);
    formData.append("lon", location.lon.toString());
    formData.append("lat", location.lat.toString());
    return formData;
  };

  const sendData = async (form: object) => {
    const url = "http://localhost:3001/alki/post_jobs";
    try {
      await console.log("sending data");
      const response = await fetch(url, {
        method: "POST",
        body: form,
      });
      alert(response.ok);
      handleComplete(true);
      setServerMessage("Job posted successfully!");
    } catch (error) {
      console.error(error);
      handleComplete(false);
    } finally {
      setLoadingx(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await geolocation(`${form.LGA} ${form.state} ${form.country}`)
      .then(() => bundleData())
      .then((form) => sendData(form));
  };

  const validateForm = (fields: FormState): Error => {
    const { title, description, contact_num, price, state, country, LGA } =
      fields;

    if (!title) {
      return {
        errostate: true,
        erromesage: "Title is required",
        field: "title",
      };
    }
    if (!state) {
      return {
        errostate: true,
        erromesage: "State is required",
        field: "state",
      };
    }
    if (!LGA) {
      return { errostate: true, erromesage: "LGA is required", field: "LGA" };
    }
    if (contact_num.length < 11 || contact_num.length > 13) {
      return {
        errostate: true,
        erromesage: "Invalid contact number",
        field: "contact_num",
      };
    }
    return { errostate: false, erromesage: "", field: "" };
  };

  function goBack() {
    history.back();
  }
  function handleComplete(state) {
    if (state) {
      return setPostComplete({ nosucsess: false, success: true });
    }
    return setPostComplete({ success: false, nosucsess: true });
  }

  return (
    <>
      <div className="container fadein">
        <div className="header create_header ">
          <div className="back_arrow">
            <MdArrowBackIos
              size={35}
              onClick={goBack}
              style={{ cursor: "pointer" }}
            />
          </div>
          <h2>Post a Job Add</h2>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="stage_cont_create">
          {stage === 1 && (
            <div className="stage">
              <h2 className="tiltle_image">
                {" "}
                select an image from you gallary{" "}
                <span className="alert">
                  {!prevImage && "No image selected"}
                </span>
              </h2>
              <div className="upload_btn">
                <input
                  type="file"
                  accept="image/*"
                  className="img_selector"
                  onChange={getImage}
                  name="thumnail"
                  value={form.thumnail}
                />
                <img
                  className={prevImage ? "preview_img" : "upload_icon"}
                  src={prevImage ? prevImage : "/upload.png"}
                  alt=""
                />
              </div>
            </div>
          )}
          {stage === 2 && (
            <div className="stage">
              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">JOB TITLE</p>
                  <p className="remaing_tex">{200 - form.title.length}</p>
                </div>
                <input
                  type="text"
                  placeholder="write a title eg(plumper needed)"
                  name="title"
                  onChange={handleForm}
                  value={form.title}
                  maxLength={200}
                />
              </div>
              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">JOB DESCRIBTION</p>
                  <p className="remaing_tex">{500 - form.description.length}</p>
                </div>
                <textarea
                  maxLength={500}
                  name="description"
                  id=""
                  onChange={handleForm}
                  placeholder="write a short description about the job"
                  value={form.description}
                ></textarea>
              </div>
              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">CONTACT NUMBER</p>
                  <p className="remaing_tex">{13 - form.contact_num.length}</p>
                </div>
                <input
                  maxLength={10}
                  type="number"
                  name="contact_num"
                  id=""
                  onChange={handleForm}
                  value={form.contact_num}
                />
              </div>

              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">JOB PRICE</p>
                  <p className="remaing_tex">{20 - form.price.length}</p>
                </div>
                <input
                  type="number"
                  name="price"
                  id=""
                  placeholder="price"
                  onChange={handleForm}
                  value={form.price}
                />
              </div>
            </div>
          )}
          {stage === 3 && (
            <div className="stage">
              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">Address</p>

                  <p className="remaing_tex">{100 - form.LGA.length}</p>
                </div>
                <input
                  type="text"
                  placeholder="LGA eg(okerri) street ex plote 12 "
                  onChange={handleForm}
                  name="LGA"
                  value={form.LGA}
                  maxLength={100}
                />
              </div>
              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">State</p>
                  <p className="remaing_tex">{20 - form.state.length}</p>
                </div>
                <datalist id="locations">{stateElement}</datalist>
                <input
                  list="locations"
                  maxLength={20}
                  type="text"
                  placeholder="state eg(abia state)"
                  onChange={handleForm}
                  name="state"
                  value={form.state}
                />
              </div>
              <div className="input_cont">
                <div className="label_cont">
                  <p className="label">Country</p>
                  <p className="remaing_tex">{15 - form.country.length}</p>
                </div>
                <input
                  maxLength={15}
                  type="text"
                  placeholder="country eg(eg nigeria)"
                  onChange={handleForm}
                  name="country"
                  value={form.country}
                />
              </div>

              <div className="radio_cont">
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleRadio}
                    id="professional_job"
                  />
                  <p className="label"> professional job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleRadio}
                    id="casual_job"
                  />
                  <p className="label"> casual job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleRadio}
                    id="remote_job"
                  />
                  <p className="label"> remote job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleRadio}
                    id="Full_time_job"
                  />
                  <p className="label"> Full time job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleRadio}
                    id="part_time_job"
                  />
                  <p className="label"> part time job</p>
                </div>
              </div>
            </div>
          )}
          {stage === 4 && (
            <div className="stage">
              <div
                className={`
                  ${validateForm(form).errostate ? `erro_message` : "no_erro"}
                  poping
                `}
              >
                <div className="icon">
                  <MdCancel size={20} />
                </div>
                {validateForm(form).erromesage}
              </div>
              <br />
              <br />

              <div className="prev_jobGrid">
                {form.type == "professional_job" ? (
                  <Job_box_p
                    thumbnail={prevImage}
                    country={form.country}
                    state={form.state}
                    data={null}
                    description={form.description}
                    localgovement={form.LGA}
                    title={form.title}
                    price={form.price}
                    type={form.type}
                    clickable={false}
                  />
                ) : (
                  <Job_box
                    thumbnail={prevImage}
                    country={form.country}
                    state={form.state}
                    data={null}
                    description={form.description}
                    localgovement={form.LGA}
                    title={form.title}
                    price={form.price}
                    type={form.type}
                    clickable={false}
                  />
                )}
              </div>
            </div>
          )}
          {postcomplete.success === true && (
            <div className="post_cont_backdrop">
              <div className="post_state">
                <MdDone
                  size={60}
                  style={{ border: "1px solid white", borderRadius: "30px" }}
                />
                <h1>Succesfully Posted</h1>
                <Link to={"/"}>
                  {serverMessage}
                  <button className="next">ok </button>
                </Link>
              </div>
            </div>
          )}
          {postcomplete.nosuccess === true && (
            <div className="post_cont_backdrop">
              <div className="post_state">
                <MdError size={60} />
                <h1>an erro occured</h1>

                <button
                  className="next"
                  onClick={() =>
                    setPostComplete({ nosuccess: false, success: false })
                  }
                >
                  try again later
                </button>
                {serverMessage}
              </div>
            </div>
          )}
          {loadingx && <Loadingx />}
          <div className="next_back_btn slideinx">
            {stage > 1 && (
              <button onClick={back} className="back slideinx">
                back
              </button>
            )}
            {stage === 3 ? (
              <button className="next " onClick={next}>
                preview
              </button>
            ) : !(stage === 4) ? (
              <button onClick={next} className="next slideinx">
                next
              </button>
            ) : (
              <button
                className="next slidex"
                type="submit"
                onClick={() => {
                  !validateForm(form).errostate && handleSubmit(event);
                  !validateForm(form).errostate && setLoadingx(true);
                  console.log(form);
                }}
                onClickCapture={() => !erro.errostate && increaseProgress()}
              >
                post
              </button>
            )}
          </div>
        </div>
        {}
      </div>
    </>
  );
};

export default Create;
