import React from "react";
import { useHistory } from "react-router";
import useFetch from "../../hooks/useFetch";
import Grid from "../../design-system/layout/Grid";
import Tile from "../../design-system/containers/Tile";

export default function Home() {
  const {
    data: { results: albums },
    loading,
  } = useFetch({
    url: "/albums",
  });

  const history = useHistory();
  const handleAlbumClick = (id) => {
    history.push("/album/" + id);
  };

  return (
    <Grid isLoading={loading}>
      {albums.map((album) => (
        <Tile
          key={album.id}
          title={`${album.name}`}
          hoverDescription={`${album.imageCount} images inside`}
          description={album.story}
          onClick={() => handleAlbumClick(album.id)}
        />
      ))}
    </Grid>
  );
}
