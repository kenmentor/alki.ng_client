/** @format */

import React, { useState } from "react";
import "./create.css";
import Job_box from "../Jobs_box/job_box";
import { Link } from "react-router-dom";
import Job_box_p from "../jobs_box_p/Job_box_p";
import "../costom_styles/animation.css";
import { FaBeer, FaDonate, FaGoodreads, FaTiktok } from "react-icons/fa";
import {
  MdArrowBack,
  MdArrowBackIos,
  MdCancel,
  MdCreate,
  MdDescription,
  MdDone,
  MdError,
  MdFilter1,
  MdFilterBAndW,
  MdFilterList,
  MdFilterListAlt,
  MdGppGood,
  MdTitle,
} from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import Loadingx from "../loading/Loadingx";
import states from "../../local_data/states";
const Create = () => {
  let [postcomplete, setpostcomplete] = useState();
  let [post, setpost] = React.useState({});
  let [prevImage, setprevImage] = useState("");
  let [stage, setstage] = React.useState(1);
  let [servermessage, setservermessage] = useState("");
  let [loadingx, setloadingx] = useState(false);
  let [form, setForm] = React.useState({
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
  let [image, setimage] = useState(null);
  let [location, setlocation] = useState({
    lat: 11111,
    lon: 10000,
  });
  let [progress, setprogress] = React.useState(0);

  let erro = {
    errostate: true,
    erromesage: `you can not submit an empty form`,
    field: "",
  };
  let stateElement = states.map((data, key) => {
    return (
      <option value={data} key={key}>
        {" "}
      </option>
    );
  });
  function handleForm(e) {
    let field = e.target;
    console.log(field.value);
    setForm((prevData) => {
      return { ...prevData, [field.name]: field.value };
    });
    console.log(form);
  }
  function handleradio(e) {
    let value = e.target.id;
    setForm((prev) => {
      return { ...prev, type: value };
    });
  }

  function reduceProgress() {
    setprogress((prevProgress) => {
      return prevProgress - 25;
    });
  }

  function increasProgress() {
    setprogress((prevProgress) => {
      return prevProgress + 25;
    });
  }

  function next(e) {
    e.preventDefault();
    increasProgress();
    console.log(form.thumnail);
    setstage((prevStage) => {
      if (prevStage < 4) {
        return prevStage + 1;
      } else {
        return prevStage;
      }
    });
  }

  function back(e) {
    e.preventDefault();
    reduceProgress();
    setstage((prevStage) => {
      if (prevStage > 1) {
        return prevStage - 1;
      } else {
        return prevStage;
      }
    });
  }

  function getImage(e) {
    e.preventDefault();
    setprevImage(URL.createObjectURL(e.target.files[0]));
    setimage(e.target.files[0]);
    console.log(e.target.fies[0]);
  }

  console.log(image);
  console.log(location.lon);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    async function geolocation(address) {
      let apikey = "mfOshsZsWIrNYJO4ul__8Nq3gva8mK7zcFprkd_3ziU";
      try {
        fetch(
          `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(
            address
          )}&apiKey=mfOshsZsWIrNYJO4ul__8Nq3gva8mK7zcFprkd_3ziU`
        )
          .then((response) => response.json())
          .then((data) => {
            const { lat, lng } = data.items[0].position;
            setlocation({
              lat: lat,
              lon: lng,
            });
            console.log("kekeke 1");
            console.log(`Latitude: ${lat}, Longitude: ${lng}`);
          });
      } catch (erro) {
        console.log(erro);
      }
    }

    // Example usage
    function bundle_data() {
      formData.append("file", image);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("contact_num", form.contact_num);
      formData.append("price", form.price);
      formData.append("state", form.state);
      formData.append("country", form.country);
      formData.append("LGA", form.LGA);
      formData.append("type", form.type.toString());
      formData.append("lon", location.lon);
      formData.append("lat", location.lat);

      console.log("bundoly data 2");
      console.log(formData);
    }
    async function send_data() {
      let url = "http://localhost:3001/alki/post_jobs";
      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        }).then((res) => {
          alert(res.ok);
          setpostcomplete(true);
          console.log("sending data 3");
          setservermessage(res.message);
        });
      } catch (error) {
        setpostcomplete(false);
        console.log(error);
      } finally {
        setloadingx(false);
      }
    }
    await geolocation(`${form.LGA} ${form.state} ${form.country}`)
      .then(() => bundle_data())
      .then(() => send_data());
  }
  console.log(progress);

  function validate_form(fields) {
    const { title, description, contact_num, price, state, country, LGA } =
      fields;

    if (!title) {
      erro.erromesage = "you need to input a title";
      erro.errostate = true;
      erro.field = "title";
      return erro;
    }
    if (!state) {
      erro.erromesage = "you need to input a state it helps people locate you";
      erro.errostate = true;
      erro.field = "state";
      return erro;
    }
    if (!LGA) {
      erro.errostate = false;
      erro.erromesage = "your address is empty ";
      erro.field = "addres";
      return erro;
    }
    if (contact_num.length < 11 || contact_num.length > 13) {
      erro.erromesage = "the number is inevalid";
      erro.errostate = true;
      erro.field = "contact_number";
      return erro;
    } else {
      erro.erromesage = "";
      erro.errostate = false;
      return erro;
    }
  }

  return (
    <>
      <div className="container fadein">
        <div className="header create_header ">
          <div className="back_arrow">
            <Link to={"/"}>
              <MdArrowBackIos size={35} />
            </Link>
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
                    onChange={handleradio}
                    id="professional_job"
                  />
                  <p className="label"> professional job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleradio}
                    id="casual_job"
                  />
                  <p className="label"> casual job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleradio}
                    id="remote_job"
                  />
                  <p className="label"> remote job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleradio}
                    id="Full_time_job"
                  />
                  <p className="label"> Full time job</p>
                </div>
                <div className="radio_box">
                  <input
                    type="radio"
                    name="job_type"
                    onChange={handleradio}
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
                className={
                  validate_form(form).errostate ? `erro_message` : "no_erro"
                }
              >
                <div className="icon">
                  <MdCancel size={20} />
                </div>
                {validate_form(form).erromesage}
              </div>

              <h2>preview post</h2>
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
          {postcomplete === true && (
            <div className="post_cont_backdrop">
              <div className="post_state">
                <MdDone
                  size={60}
                  style={{ border: "1px solid white", borderRadius: "30px" }}
                />
                <h1>Succesfully Posted</h1>
                <Link to={"/"}>
                  {servermessage}
                  <button className="next">ok </button>
                </Link>
              </div>
            </div>
          )}
          {postcomplete === false && (
            <div className="post_cont_backdrop">
              <div className="post_state">
                <MdError size={60} />
                <h1>an erro occured</h1>
                <Link to={"/"}>
                  <button className="next">try again later</button>
                  {servermessage}
                </Link>
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
                  !erro.errostate && handleSubmit(event);
                  !erro.errostate && setloadingx(true);
                }}
                onClickCapture={() => !erro.errostate && increasProgress()}
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
