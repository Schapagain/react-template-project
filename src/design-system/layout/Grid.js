import React from "react";
import LoadingDots from "../loading/LoadingDots";

export default function Grid({ isLoading, children }) {
  return (
    <div className="grid relative items-center w-full justify-center gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {isLoading ? <LoadingDots /> : children}
    </div>
  );
}
