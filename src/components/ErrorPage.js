import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error, "error");
  return (
    <div className=" h-full flex flex-col justify-center items-center">
      <h1 className="pt-24 text-2xl font-bold">Oops!!!</h1>
      <br />
      <span className="text-xl">
        This page is not loaded because this page is <b>{error.statusText}</b>{" "}
        {""}
        🤯
      </span>
    </div>
  );
};

export default ErrorPage;
