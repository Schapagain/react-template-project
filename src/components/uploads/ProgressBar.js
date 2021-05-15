import React from "react";

export default function ProgressBar({
  progress,
  className,
  text,
  color = "green-500",
}) {
  return (
    <div
      className={
        className +
        " rounded-full text-xxs z-50 relative overflow-hidden bg-white flex w-full h-3"
      }
    >
      <p
        style={{
          width: `${progress}%`,
        }}
        className={`bg-${color} absolute left-0 rounded-full h-full transition-width duration-300 ease-linear`}
      ></p>
      <span className="top-1/2 absolute transform -translate-y-1/2 left-1/2 -translate-x-1/2">
        {text}
      </span>
    </div>
  );
}
