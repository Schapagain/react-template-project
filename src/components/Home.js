import React from "react";
import useFetch from "../hooks/useFetch";
import Tile from "./Tile";
import Grid from "../design-system/layout/Grid";

export default function Home() {
  const {
    data: { results: collections },
  } = useFetch({});
  console.log(collections);
  return (
    <Grid>
      {collections.map((collection) => (
        <Tile
          key={collection.id}
          title={`Collection #${collection.id}`}
          hoverDescription={`${collection.imageCount} images inside`}
          description="This is a fun collection of images"
        />
      ))}
    </Grid>
  );
}
