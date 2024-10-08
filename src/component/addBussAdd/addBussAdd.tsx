/** @format

import React, { useState } from "react";
import "./create.css";
import Job_box from "../Jobs_box/job_box";

const addBussAdd = () => {
  function home_p() {
    setpage(true);
  }
  let [postcomplete, setpostcomplete] = useState(false);
  let [post, setpost] = React.useState({});
  let [stage, setstage] = React.useState(1);
  let [form, setForm] = React.useState({
    thumnail: "",
    name: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    state: "",
    LGA: "",
  });
  let [progress, setprogress] = React.useState(0);

  function handleForm(e) {
    let field = e.target;
    console.log(field);
    setForm((prevData) => {
      return { ...prevData, [field.name]: field.value };
    });
    console.log(form);
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

  function next() {
    increasProgress();
    setstage((prevStage) => {
      if (prevStage < 4) {
        return prevStage + 1;
      } else {
        return prevStage;
      }
    });
  }

  function back() {
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
    let img = URL.createObjectURL(e.target.files[0]);
    console.log(img);
    setForm((prevData) => {
      let field = e.target;
      return { ...prevData, [field.name]: "wenin" };
    });
  }

  async function handleSubmit() {
    let url = "http://localhost:3001/posts/post";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((res) => {
        setpostcomplete(res.ok);
      });
    } catch (error) {
      alert(error);
    }
  }
  console.log(progress);

  return (
    <>
      <div className="header create_header">
        <div className="back">
          <img src="src\assets\arrow ford.png" alt="" onClick={home_p} />
        </div>
        <h2>Post a Job Add</h2>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="stage_cont_create">
        {stage === 1 && (
          <div className="stage">
            <p> select an image from you gallary</p>
            <div className="upload_btn">
              <input
                type="file"
                className="img_selector"
                onChange={getImage}
                
                name="thumnail"
                value={form.thumnail}
              />
              <img src="src\assets\email.png" alt="" />
            </div>
          </div>
        )}
        {stage === 2 && (
          <div className="stage">
            <div className="input_cont">
              <p className="label">JOB TITLE</p>
              <input
                type="text"
                placeholder="write a title eg(plumper needed)"
                name="title"
                onChange={handleForm}
                value={form.name}
              />
            </div>
            <div className="input_cont">
              <p className="label">JOB TITLE</p>
              <textarea
                name="description"
                id=""
                onChange={handleForm}
                placeholder="write a short description about the job"
                value={form.description}
              ></textarea>
            </div>
          </div>
        )}
        {stage === 3 && (
          <div className="stage">
            <div className="input_cont">
              <p className="label">LGA</p>
              <input
                type="text"
                placeholder="LGA eg(okerri)"
                onChange={handleForm}
                name="LGA"
                value={form.LGA}
              />
            </div>
            <div className="input_cont">
              <p className="label">State</p>
              <input
                type="text"
                placeholder="state eg(abia state)"
                onChange={handleForm}
                name="state"
                value={form.state}
              />
            </div>
            <div className="input_cont">
              <p className="label">Country</p>
              <input
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
                  name="professional_job"
                  onChange={handleForm}
                />
                <p className="label"> professional job</p>
              </div>
              <div className="radio_box">
                <input type="radio" name="casual_job" onChange={handleForm} />
                <p className="label"> casual job</p>
              </div>
              <div className="radio_box">
                <input type="radio" name="remote_job" onChange={handleForm} />
                <p className="label"> remote job</p>
              </div>
              <div className="radio_box">
                <input type="radio" name="remote_job" onChange={handleForm} />
                <p className="label"> Full time job</p>
              </div>
              <div className="radio_box">
                <input type="radio" name="remote_job" onChange={handleForm} />
                <p className="label"> part time job</p>
              </div>
            </div>
          </div>
        )}
        {stage === 4 && (
          <div className="stage">
            <h2>preview post</h2>
            <div className="prev_jobGrid">
              <Job_box
                image={"src/assets/20240714_011112.png"}
                country={form.country}
                state={form.state}
                data={null}
                description={form.description}
                localgovement={form.LGA}
                title={form.title}
                price={form.price}
              />
            </div>
            {postcomplete && (
              <div className="post_state">Succesfully Posted</div>
            )}
          </div>
        )}

        <div className="next_back_btn">
          {stage > 1 && (
            <button onClick={back} className="back">
              back
            </button>
          )}
          {stage === 3 ? (
            <button className="next" onClick={next}>
              preview
            </button>
          ) : !(stage === 4) ? (
            <button onClick={next} className="next">
              next
            </button>
          ) : (
            <button
              className="next"
              type="submit"
              onClick={handleSubmit}
              onClickCapture={() => {
                increasProgress();
                home_p();
              }}
            >
              post
            </button>
          )}
        </div>
      </div>
      {}
    </>
  );
};

export default addBussAdd;

 */

