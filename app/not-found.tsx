import { NoSymbolIcon } from "@heroicons/react/16/solid";
import React from "react";

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="capitalize font-bold">You are not unauthorized</p>
      <NoSymbolIcon className="w-12 text-red-500" />
    </div>
  );
};

export default Unauthorized;
