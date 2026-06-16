import React from "react";
import { FadeLoader } from "react-spinners";
import "./Loading.css";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="loading">
      <FadeLoader color="#FF9900" height={40} width={5} radius={2} margin={3} />

      <p>{message}</p>
    </div>
  );
};

export default Loading;
