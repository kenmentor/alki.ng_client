/** @format */

import { React, useState } from "react";
import "./contact.css";
import {
  MdEmail,
  MdHideSource,
  MdMarkEmailRead,
  MdMessage,
  MdSend,
} from "react-icons/md";
import { FaUser, FaUserSlash, FaWhatsapp } from "react-icons/fa";

const Contact = ({
  setcontact,
  price,
  type,
  title,
  contact_num,
  home,
} = prop) => {
  let [message, setmessage] = useState(
    `Good Day \n I saw your job post (${title}) on alki.ng, and decideded to reach out to you to make  known my interest `
  );
  let [link, setlink] = useState(`https://wa.me/${format_num(
    contact_num
  )}?text=${encodeURIComponent(message)}
`);
  let [channel, setchannel] = useState({
    channelImg: (
      <FaWhatsapp
        size={30}
        style={{ background: "green", padding: "5", borderRadius: "30px" }}
      />
    ),
    channelName: "whatApp",
  });
  let [Channeldrop, setChanneldrop] = useState(false);
  function format_num(number, m) {
    let formated = number;
    if (number.length === 11) {
      formated = number.slice(1);
      m ? (formated = `+234${formated}`) : (formated = `234${formated}`);
    }

    return formated;
  }
  console.log();
  function handle_change(e) {
    setmessage(e.target.value);
  }
  function toogle_channeldrop() {
    setChanneldrop((prev) => !prev);
  }
  function handle_backdrop() {
    home
      ? setcontact((prev) => ({ ...prev, chat_state: false }))
      : setcontact(false);
  }

  return (
    <>
      <div className={`contact_container `}>
        <div className="contact_backdrop" onClick={handle_backdrop}></div>
        <div className={`contact_box  ${channel.channelName}`}>
          <div className="channels">
            <div className={`display_channel  `}>
              {channel.channelImg}
              <p>
                {" "}
                {contact_num.length === 13 ? "+" + contact_num : contact_num}
              </p>
            </div>
            <div className="select_channel">
              <img src="/more2.png" alt="" onClick={toogle_channeldrop} />

              {Channeldrop && (
                <div className="channel_drop">
                  <FaWhatsapp
                    size={30}
                    className="channel"
                    onClick={() => {
                      setchannel({
                        channelImg: (
                          <FaWhatsapp
                            size={30}
                            style={{
                              background: "green",
                              borderRadius: "30px",
                              padding: "5px",
                            }}
                          />
                        ),
                        channelName: `whatApp `,
                      });
                      setlink(
                        `https://wa.me/${format_num(
                          contact_num,
                          false
                        )}?text=${encodeURIComponent(message)}`
                      );
                    }}
                  />
                  <MdMessage
                    size={30}
                    className="channel"
                    onClick={() => {
                      setchannel({
                        channelImg: (
                          <MdMessage
                            size={30}
                            style={{
                              background: "#1d2124",
                              borderRadius: "30px",
                              padding: "5px",
                            }}
                          />
                        ),
                        channelName: "Message",
                      });
                      setlink(
                        `sms:${format_num(
                          contact_num,
                          true
                        )}?body=${encodeURIComponent(message)}`
                      );
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={`output_cont `}>
            {message && <div className="output">{message}</div>}
          </div>
          <div className="sender_cont">
            <textarea
              className="message_input"
              onChange={handle_change}
              name=""
              id=""
              value={message}
            ></textarea>

            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="send"
            >
              <MdSend size={26} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
