import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";
import VideoComp from "./VideoCard";

export default function SecondPage() {
  const [videoData, updateVideodata] = useState([]);
  const [spinner, updateSpdata] = useState(true);

  useEffect(() => {
    async function retrieve() {
      await axios
        .get("/retrieve")
        .then((resp) => {
          updateVideodata(resp.data);

          updateSpdata(false);
        })
        .catch((err) => {
          updateSpdata(false);
          alert("Something went wrong, Please check your internet connection");
          console.warn("Something went wrong", err);
        });
    }
    retrieve();
  }, []);
  return (
    <div>
      {spinner ? (
        <PropagateLoader />
      ) : (
        <div className="d-flex flex-wrap container justify-content-around">
          {videoData.map((element) => {
            return <VideoComp data={element} key={element._id} />;
          })}
        </div>
      )}
    </div>
  );
}
