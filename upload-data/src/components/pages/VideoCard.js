import React from "react";

export default function VideoCard({ data }) {
  const style1 = {
    width: "18rem",
  };

  return (
    <div className="m-3 ">
      <div className="card" style={style1}>
        <img src={data.imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{data.videoTitle}</h5>
          <p className="card-text">{data.videoDescription}</p>
          <a
            href={"/ThirdPage/" + data.videoUrl.substr(26)}
            className="btn btn-primary"
          >
            Play Video
          </a>
        </div>
      </div>
    </div>
  );
}
