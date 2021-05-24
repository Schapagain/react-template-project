import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ImageUpload from "../../components/uploads/ImageUpload";
import GridImage from "../../design-system/containers/GridImage";
import Columns from "../../design-system/layout/Columns";
import useFetch from "../../hooks/useFetch";
import { AiOutlineArrowRight, AiOutlinePlus } from "react-icons/ai";
import { Button } from "../../design-system/form";
import InPlaceMenu from "../../components/misc/InPlaceMenu";
import Notifications from "../../components/misc/Notifications";
import { callAPI } from "../../utils/api";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [showMenu, setMenu] = useState(null);
  const [images, setImages] = useState([]);
  const { data, loading } = useFetch({
    url: "/images",
    refresh,
  });

  useEffect(() => {
    setImages(data?.results);
  }, [data]);

  const {
    data: { results: albums },
  } = useFetch({
    url: "/albums",
  });

  const { token } = useAuthContext();
  const { addNotification, updateNotification } = useNotificationContext();
  const handleAddToAlbum = async (album) => {
    const image = { ...showMenu };
    setMenu(null);
    const notificationId = uuid();
    addNotification({
      id: notificationId,
      msg: "Adding Image to album...",
      type: "warning",
      scope: "add_to_album",
    });
    await callAPI({
      url: `/images/${image?.id}/add_to_album/${album?.id}`,
      method: "get",
      token,
      onSuccess: () => {
        updateNotification({
          id: notificationId,
          msg: "Image has been added to the album",
          type: "success",
          scope: "add_to_album",
          expiry: 1500,
        });
        //update image locally
        setImages((images) =>
          images.map((image) =>
            image.id === image.id ? { ...image, album } : image
          )
        );
      },
      onError: () => {
        updateNotification({
          id: notificationId,
          msg: "Something went wrong while adding image",
          type: "failure",
          scope: "add_to_album",
          expiry: 5000,
        });
      },
    });
  };

  const history = useHistory();
  return (
    <div className="flex flex-col w-full h-full">
      <Notifications scope="add_to_album" />
      <div className="mb-5">
        <Button label="view all albums" onClick={() => history.push("/albums")}>
          View Albums
        </Button>
      </div>
      <div className="relative w-full flex items-center justify-center h-4 mb-5">
        <div className="right-0 absolute">
          <ImageUpload
            onSuccess={() => setRefresh((r) => !r)}
            url={`/images`}
          />
        </div>
      </div>
      <Columns numColumns={3} isLoading={loading}>
        {images?.map((image) => (
          <GridImage
            onHoverChange={(hovered) => !hovered && setMenu(null)}
            key={image.id}
            {...image}
          >
            <div className="flex w-full h-full bg-black bg-opacity-40 text-white">
              {image.album ? (
                <div className="m-auto text-xl flex items-center">
                  <p>In {image.album.name}</p>
                  <AiOutlineArrowRight
                    onClick={() => history.push(`/albums/${image.album.id}`)}
                    className="hover:bg-gray-500 text-3xl rounded-full p-0.5 pointer-events-auto ml-1 hover:text-black"
                    role="button"
                    aria-label={"go to album " + image.album.name}
                  />
                </div>
              ) : (
                <div className="m-auto text-xl flex items-center">
                  <p className="m-auto text-xl">Not in any Album</p>
                  <AiOutlinePlus
                    onClick={() => setMenu(image)}
                    className="hover:bg-gray-500 text-3xl rounded-full p-0.5 pointer-events-auto ml-1 hover:text-black"
                    role="button"
                    aria-label={"add image to an album"}
                  />
                  {showMenu && showMenu.id === image.id && (
                    <InPlaceMenu>
                      {albums.map((album) => (
                        <p
                          onClick={() => handleAddToAlbum(album)}
                          key={album.id}
                          role="menuitem"
                          className="hover:bg-theme px-2 cursor-pointer py-1 hover:text-white"
                        >
                          {album.name}
                        </p>
                      ))}
                    </InPlaceMenu>
                  )}
                </div>
              )}
            </div>
          </GridImage>
        ))}
      </Columns>
    </div>
  );
}
