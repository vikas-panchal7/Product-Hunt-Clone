import React from "react";

import img from "../assets/images/load.gif";
const Loading = () => {
  return (
    <div>
      <img src={img} height='100%' width='100%' alt='loading' />
    </div>
  );
};

export default Loading;
