import React from "react";
import LoadingDots from "../loading/LoadingDots";

export default function Columns({ isLoading, children, numColumns, gutter }) {
  const columns = new Array(numColumns).fill(0).map((_) => []);

  React.Children.forEach(children, (child, index) => {
    columns[index % numColumns].push(child);
  });

  return (
    <div className="flex justify-center w-full box-border">
      {isLoading ? (
        <LoadingDots />
      ) : (
        columns.map((col, index) => (
          <div
            key={index}
            style={{
              marginLeft: index > 0 && gutter,
            }}
            className="flex flex-col flex-1 justify-start w-0 items-stretch"
          >
            {col.map((child, index) => (
              <div
                key={index}
                style={{
                  marginTop: index > 0 && gutter,
                }}
              >
                {child}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

Columns.defaultProps = {
  numColumns: 3,
  gutter: 10,
};
