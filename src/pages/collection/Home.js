import React from "react";
import GridImage from "../../design-system/containers/GridImage";
import Columns from "../../design-system/layout/Columns";
import useFetch from "../../hooks/useFetch";

export default function Home({ match }) {
  const { data: collection, loading } = useFetch({
    url: "/collection/" + match.params.id,
  });
  return (
    <div className="flex relative flex-col items-center">
      <p>{collection?.name}</p>
      <Columns isLoading={loading}>
        {collection?.images?.map((image) => (
          <GridImage key={image.id} src={image.src} alt="" />
        ))}
      </Columns>
    </div>
  );
}
