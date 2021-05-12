import React from "react";
import GridImage from "../../design-system/containers/GridImage";
import Columns from "../../design-system/layout/Columns";
import useFetch from "../../hooks/useFetch";

export default function Home({ match }) {
  const { data: collection, loading } = useFetch({
    url: "/collection/" + match.params.id,
  });
  return (
    <div className="flex w-full relative flex-col items-center">
      <h1 className="text-2xl">{collection?.name}</h1>
      {!loading && (
        <span
          aria-hidden={true}
          className="w-1/2 h-1 rounded-md mb-5 bg-theme"
        />
      )}
      <Columns isLoading={loading}>
        {collection?.images?.map((image) => (
          <GridImage key={image.id} src={image.src} alt="" />
        ))}
      </Columns>
    </div>
  );
}
