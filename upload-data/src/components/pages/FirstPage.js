import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import axios from "axios";
export default function FirstPage() {
  const [videoInformation, updateInfo] = useState({
    videoTitle: "",
    videoDescription: "",
    videoThumbnail: null,
    videoActual: null,
  });
  const navigate = useNavigate();
  const [spinner, updateSpstate] = useState(false);
  useEffect(() => {}, [spinner]);
  const sendVideo = async () => {
    if (
      videoInformation.videoTitle === "" ||
      videoInformation.videoDescription === "" ||
      videoInformation.videoThumbnail === null ||
      videoInformation.videoActual === null
    ) {
      console.warn("cannot be empty");
      updateSpstate(false);
    }
    //checking video file and image file type
    else if (
      ![
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/PNG",
        "image/JPEG",
        "image/JPG",
      ].includes(videoInformation.videoThumbnail.type) ||
      ![
        "video/mp4",
        "video/AVI",
        "video/MPG",
        "video/MP4",
        "video/avi",
        "video/mpg",
      ].includes(videoInformation.videoActual.type)
    ) {
      alert("Type file of the type does not match");
      updateSpstate(false);
    } else {
      const formData = new FormData();

      formData.append("videoTitle", videoInformation.videoTitle);
      formData.append("videoDescription", videoInformation.videoDescription);
      formData.append("files", videoInformation.videoThumbnail);
      formData.append("files", videoInformation.videoActual);

      await axios
        .post("/upload", formData)
        .then((response) => {
          updateSpstate(false);
          updateInfo({
            videoTitle: "",
            videoDescription: "",
            videoThumbnail: null,
            videoActual: null,
          });
          navigate("/SecondPage");
        })
        .catch((error) => {
          console.log("this is the error ", error);
          updateSpstate(false);
        });
    }
  };
  const changeState = (e) => {
    // console.log("this is the element ", e.target.value, e.target.name);
    const name = e.target.name;
    const value = e.target.value;
    updateInfo({ ...videoInformation, [name]: value });
  };

  return (
    <div className="container col-lg-6">
      <div className="row m-3">
        <h1>Upload Videos</h1>
      </div>
      {spinner ? (
        <PropagateLoader />
      ) : (
        <form
          className="container"
          onSubmit={(e) => {
            e.preventDefault();
            updateSpstate(true);
            sendVideo(e);
          }}
        >
          <div className="row ">
            <p className="text-left row "> Video Title</p>
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter Video Title"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={videoInformation.videoTitle}
                name="videoTitle"
                maxLength="50"
                required
                onChange={(e) => {
                  changeState(e);
                }}
              />
            </div>
          </div>

          <div className="row ">
            <p className="text-left row "> Video Description</p>

            <textarea
              className="form-control mb-3"
              aria-label="With textarea"
              placeholder="Be specific about video information...."
              value={videoInformation.videoDescription}
              name="videoDescription"
              maxLength="200"
              required
              onChange={(e) => {
                changeState(e);
              }}
            ></textarea>
          </div>
          <div className=" row  bg-light ">
            <p className="text-left row "> Upload Thumbnail</p>

            <input
              className="form-control mb-3"
              type="file"
              id="formFileImage"
              name="videoThumbnail"
              required
              onChange={(e) => {
                const obj = {
                  ...videoInformation,
                  [e.target.name]: e.target.files[0],
                };
                updateInfo(obj);

                //   changeState(e);
              }}
            />
          </div>

          <div className="row ">
            <p className="text-left row "> Upload Video</p>
            <input
              className="form-control mb-3"
              type="file"
              id="formFileVideo"
              name="videoActual"
              required
              onChange={(e) => {
                updateInfo({
                  ...videoInformation,
                  [e.target.name]: e.target.files[0],
                });

                //   changeState(e);
              }}
            />
          </div>
          <button className="btn btn-primary mb-5" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
