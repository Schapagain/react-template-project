import React from "react";
import { useHistory } from "react-router";
import ImageUpload from "../../components/uploads/ImageUpload";
import GridImage from "../../design-system/containers/GridImage";
import Columns from "../../design-system/layout/Columns";
import useFetch from "../../hooks/useFetch";
import { AiOutlineArrowRight } from "react-icons/ai";

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
      <div className="relative w-full flex items-center justify-center h-4 mb-5">
        <div className="right-0 absolute">
          <ImageUpload url={`/images/upload/`} />
        </div>
      </div>
      <Columns numColumns={3} isLoading={loading}>
        {images?.map((image) => (
          <GridImage key={image.id} {...image}>
            <div className="flex w-full h-full bg-black bg-opacity-40 text-white">
              {image.album ? (
                <div className="m-auto text-xl flex items-center">
                  <p>In {image.album.name}</p>
                  <AiOutlineArrowRight
                    className="hover:bg-gray-500 ml-1 hover:text-black"
                    role="button"
                    aria-label={"go to album " + image.album.name}
                  />
                </div>
              ) : (
                <p className="m-auto text-xl">Not in any Album</p>
              )}
            </div>
          </GridImage>
        ))}
      </Columns>
    </div>
  );
}
