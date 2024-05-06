import React from "react";
import './Loading.css'
import ReactLoading from "react-loading";
export const Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type="spinningBubbles" color="white" />
    </div>
  );
};
