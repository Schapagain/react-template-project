import React from "react";

export default function LoadingDots() {
  const dot = "w-2 h-2 rounded-full animate-loading-dot bg-white";

  return (
    <div
      className={`absolute inset-0 bg-theme w-full h-full justify-center mx-1 flex appearance-none`}
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
