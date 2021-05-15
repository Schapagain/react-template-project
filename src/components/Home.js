import React from "react";
import { useHistory } from "react-router";
import GridImage from "../design-system/containers/GridImage";
import Columns from "../design-system/layout/Columns";
import useFetch from "../hooks/useFetch";

const Button = ({ children, label, ...rest }) => {
  return (
    <div
      role="button"
      aria-label={label}
      className="bg-gray-300 rounded-md w-fit-content p-2 hover:bg-theme hover:text-white transition-fast"
      {...rest}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const {
    data: { results: images },
    loading,
  } = useFetch({
    url: "/images",
  });
  const history = useHistory();
  return (
    <div className="flex flex-col w-full h-full">
      <div className="mb-5">
        <Button label="view all albums" onClick={() => history.push("/albums")}>
          View Albums
        </Button>
      </div>
      <Columns isLoading={loading}>
        {images?.map((image) => (
          <GridImage key={image.id} src={image.src} alt="" />
        ))}
      </Columns>
    </div>
  );
}
