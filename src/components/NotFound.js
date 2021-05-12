import React from "react";
import { VscError } from "react-icons/vsc";

export default function NotFound() {
  return (
    <div className="w-full h-full flex">
      <div className="m-auto items-center flex flex-col">
        <VscError className="text-5xl" />
        <p className="uppercase">page not found</p>
      </div>
    </div>
  );
}
