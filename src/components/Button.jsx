import React, { memo } from "react";
import { useRef, useEffect, useReducer } from "react";

export const Button = ({ clickFn, label }) => {
  const worker = new Worker("../workers/index.js");

  const sendWorker = () => {
    worker.postMessage({
      id: 1,
      firstName: "Ahmed",
    });
  };

  worker.addEventListener("message", (e) => {
    console.log(e.data);
  });

  return (
    <>
      <button onClick={sendWorker}>Send Worker</button>
      <br />
    </>
  );
};
