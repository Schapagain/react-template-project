import React, { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import LoadingDots from "../loading/LoadingDots";

const GridImage = ({
  src,
  alt = "",
  width,
  height,
  children,
  onHoverChange,
}) => {
  const [loading, setLoading] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const ref = useRef();

  useEffect(() => {
    onHoverChange(isHovered);
  }, [isHovered]);

  useIntersectionObserver({
    target: ref,
    threshold: [0.1, 0.25],
    onIntersect: (
      [{ isIntersecting, intersectionRatio, target }],
      observerElement
    ) => {
      if ((isIntersecting, intersectionRatio)) {
        setVisible(true);
        if (intersectionRatio >= 0.25) observerElement.unobserve(target);
      }
    },
  });

  const aspectRatio = (height / width) * 100;

  return (
    <div
      ref={ref}
      className="relative bg-gray-300 overflow-hidden w-full"
      style={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity .15s linear",
        background: "rgba(0, 0, 0, 0.05)",
        paddingBottom: `${aspectRatio}%`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {loading && (
        <div className="absolute opacity-50 inset-0 bg-gray-300 z-20">
          <div className="relative w-full h-full">
            <LoadingDots />
          </div>
        </div>
      )}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0 w-full h-full z-20">
          {children}
        </div>
      )}
      {isVisible && (
        <img
          onLoad={() => setLoading(false)}
          className="absolute top-0 left-0 w-full h-full z-10"
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

GridImage.defaultProps = {
  metadata: { height: 400, width: 400 },
  onHoverChange: () => null,
};

export default GridImage;
