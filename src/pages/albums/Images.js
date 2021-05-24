import React from "react";
import GridImage from "../../design-system/containers/GridImage";
import Columns from "../../design-system/layout/Columns";
import useFetch from "../../hooks/useFetch";
import ImageUpload from "../../components/uploads/ImageUpload";
import EditableText from "../../components/misc/EditableText";

export default function Images({ match }) {
  const { data: album, loading } = useFetch({
    url: "/albums/" + match.params.id,
  });
  return (
    <div className="flex w-full relative flex-col items-center">
      <EditableText
        className="text-2xl"
        text={album?.name}
        saveUrl={`/albums/${album.id}`}
        makePayload={(text) => ({ name: text })}
      />
      {!loading && (
        <div className="relative w-full flex items-center justify-center h-4 mb-5">
          <span aria-hidden={true} className="w-1/2 h-1 rounded-md bg-theme" />
          {/* [TODO] Create an API to accept images for a collection */}
          {/* <div className="right-0 absolute">
            <ImageUpload url={`/album/${match.params.id}/upload/`} />
          </div> */}
        </div>
      )}
      <EditableText
        className="mb-1"
        text={album.story}
        saveUrl={`/albums/${album.id}`}
        makePayload={(text) => ({ story: text })}
      />
      <Columns numColumns={3} isLoading={loading}>
        {album?.images?.map((image) => (
          <GridImage key={image.id} {...image} alt="" />
        ))}
      </Columns>
    </div>
  );
}
