import React from "react";
import classNames from "classnames";

export default function LoadingDots({ color = "theme" }) {
  const dot = classNames({
    "w-2 h-2 rounded-full animate-loading-dot": true,
    [`bg-${color}`]: true,
  });
  const dot1 = classNames(dot, {});
  const dot2 = classNames(dot, {
    "delay-333": true,
  });
  const dot3 = classNames(dot, { "delay-667": true });

  return (
    <div className="my-auto justify-center mx-1 h-fit-content flex appearance-none">
      <div className="flex my-auto justify-between w-9">
        <span aria-hidden="true" className={dot1} />
        <span aria-hidden="true" className={dot2} />
        <span aria-hidden="true" className={dot3} />
      </div>
    </div>
  );
}
