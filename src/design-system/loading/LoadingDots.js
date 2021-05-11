import React from "react";
import classNames from "classnames";

export default function LoadingDots({ color = "theme" }) {
  const dot = classNames({
    "w-2 h-2 rounded-full animate-loading-dot": true,
    [`bg-white`]: true,
  });

  return (
    <div
      className={`absolute bg-${color} inset-0 justify-center mx-1 h-fit-content flex appearance-none`}
      aria-hidden="true"
    >
      <div className="flex my-auto justify-between w-9">
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
      </div>
    </div>
  );
}
