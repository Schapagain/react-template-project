import React from "react";

export default function GridImage({ ...rest }) {
  return <img className="w-full h-auto object-contain" {...rest} />;
}
