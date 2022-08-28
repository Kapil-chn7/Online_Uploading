import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ThirdPage() {
  const params = useParams();

  const [url, updateUrl] = useState("");
  useEffect(() => {
    const url1 =
      "http://res.cloudinary.com" +
      `/${params.url}/${params.one}/${params.two}/${params.three}/${params.four}`;
    updateUrl(url1);
  }, [url, params]);
  return (
    <div className="container mb-5">
      {url && (
        <div className="row">
          <h1>This is Third page</h1>
          <video width="750" height="500" controls loop autoPlay>
            <source src={url} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
