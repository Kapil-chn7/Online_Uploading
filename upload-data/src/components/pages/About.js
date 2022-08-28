import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
export default function About() {
  let decor = {
    textDecoration: "None",
  };
  return (
    <div className="container bg-light">
      <div className="row">
        <div className="row">
          <span>
            {" "}
            <BsGithub /> &nbsp;
            <a
              href="https://github.com/Kapil-chn7/Online_Uploading"
              style={decor}
            >
              Please find Source code on
            </a>
          </span>
        </div>
        <div className="row">
          <span>
            {" "}
            <BsLinkedin /> &nbsp;
            <a
              href="https://www.linkedin.com/in/kapilchauhan200/ "
              style={decor}
            >
              Contact on linkedin
            </a>
          </span>
        </div>
        <div className="row">
          <span>
            <GrMail /> &nbsp; kapilchn7@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
