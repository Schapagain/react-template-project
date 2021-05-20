import React, { useEffect, useRef, useState } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import LoadingDots from "../loading/LoadingDots";

const GridImage = React.memo(
  ({ src, placeholder, alt = "", metadata: { width, height }, children }) => {
    const [loading, setLoading] = useState(true);
    const [isVisible, setVisible] = useState(-1);
    const [currentSrc, updateSrc] = useState(null);
    const [isHovered, setHovered] = useState(false);
    const ref = useRef();

    useEffect(() => {
      if (isVisible) {
        if (isVisible >= 0.25) {
          if (currentSrc != src) {
            updateSrc(src);
          }
        } else if (isVisible >= 0.1) {
          if (currentSrc != placeholder) {
            updateSrc(placeholder);
          }
        }
      }
    }, [isVisible]);

    useIntersectionObserver({
      target: ref,
      threshold: [0.1, 0.25],
      onIntersect: (
        [{ isIntersecting, intersectionRatio, target }],
        observerElement
      ) => {
        if ((isIntersecting, intersectionRatio)) {
          setVisible((oldRatio) =>
            Math.abs(oldRatio - intersectionRatio) > 0.1
              ? intersectionRatio
              : oldRatio
          );
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
          <div className="absolute opacity-50 inset-0 bg-gray-300 z-30">
            <div className="relative w-full h-full">
              <LoadingDots />
            </div>
          </div>
        )}
        {isHovered && (
          <div className="pointer-events-none absolute inset-0 w-full h-full z-40">
            {children}
          </div>
        )}
        <img
          onLoad={() => currentSrc === src && setLoading(false)}
          className="absolute top-0 left-0 w-full h-full z-20"
          src={currentSrc}
          alt={alt}
        />
      </div>
    );
  }
);

GridImage.defaultProps = {
  metadata: { height: 400, width: 400 },
};

export default GridImage;
