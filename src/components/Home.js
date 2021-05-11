import React from "react";
import useFetch from "../hooks/useFetch";
import Tile from "./Tile";
import Grid from "../design-system/layout/Grid";
import { useHistory } from "react-router";

export default function Home() {
  const {
    data: { results: collections },
    loading,
  } = useFetch({
    url: "/collections",
  });

  const history = useHistory();
  const handleCollectionClick = (id) => {
    history.push("/collection/" + id);
  };
  return (
    <Grid isLoading={loading}>
      {collections.map((collection) => (
        <Tile
          key={collection.id}
          title={`Collection #${collection.id}`}
          hoverDescription={`${collection.imageCount} images inside`}
          description="This is a fun collection of images"
          onClick={() => handleCollectionClick(collection.id)}
        />
      ))}
    </Grid>
  );
}
