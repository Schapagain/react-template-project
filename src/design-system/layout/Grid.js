import React from "react";

export default function Grid({ children }) {
  return (
    <div className="grid items-center justify-center gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {children}
    </div>
  );
}
