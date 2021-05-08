import React from "react";
import useFetch from "../hooks/useFetch";
import Tile from "./Block";

export default function Home() {
  const {
    data: { results: collections },
  } = useFetch({});
  console.log(collections);
  return (
    <div className="flex flex-wrap items-center justify-center">
      {collections.map((collection) => (
        <Tile
          key={collection.id}
          title={`Collection #${collection.id}`}
          hoverDescription={`${collection.imageCount} images inside`}
          description="This is a fun collection of images"
        />
      ))}
    </div>
  );
}
