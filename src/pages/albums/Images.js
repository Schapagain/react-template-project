import React from "react";
import GridImage from "../../design-system/containers/GridImage";
import Columns from "../../design-system/layout/Columns";
import useFetch from "../../hooks/useFetch";
import ImageUpload from "../../components/uploads/ImageUpload";

export default function Images({ match }) {
  const { data: album, loading } = useFetch({
    url: "/album/" + match.params.id,
  });
  return (
    <div className="flex w-full relative flex-col items-center">
      <h1 className="text-2xl">{album?.name}</h1>
      {!loading && (
        <div className="relative w-full flex items-center justify-center h-4 mb-5">
          <span aria-hidden={true} className="w-1/2 h-1 rounded-md bg-theme" />
          <div className="right-0 absolute">
            <ImageUpload url={`/album/${match.params.id}/upload/`} />
          </div>
        </div>
      )}
      <Columns isLoading={loading}>
        {album?.images?.map((image) => (
          <GridImage key={image.id} src={image.src} alt="" />
        ))}
      </Columns>
    </div>
  );
}
