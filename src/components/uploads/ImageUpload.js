import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { callAPI } from "../../utils/api";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { v4 as uuid } from "uuid";
import { Button } from "../../design-system/form";
import { useAuthContext } from "../../contexts/AuthContext";
import UploadNotifications from "./UploadNotifications";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

ImageUpload.defaultProps = {
  setProgress: () => null,
  onSuccess: () => null,
};

export default function ImageUpload({ url, setProgress, onSuccess }) {
  const { token } = useAuthContext();
  const [filesToUpload, setfilesToUpload] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setfilesToUpload(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = filesToUpload.map((file) => (
    <div style={thumb} key={file.name}>
      <div className="overflow-hidden flex min-w-0">
        <img src={file.preview} className="w-auto h-full block" alt="" />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      filesToUpload.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [filesToUpload]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const handleUpload = () => {
    if (filesToUpload) {
      const uploadData = new FormData();
      for (let i = 0; i < filesToUpload.length; i++) {
        uploadData.append("image", filesToUpload[i]);
      }
      uploadFiles(uploadData, filesToUpload.length);
      setOpen(false);
    }
  };

  const { addNotification, updateNotification } = useNotificationContext();

  function uploadFiles(uploadData, numFiles) {
    const notificationId = uuid();
    addNotification({
      id: notificationId,
      msg: `Uploading ${numFiles} image${numFiles > 1 ? "s" : ""}`,
      type: "success",
      scope: "upload",
      progress: 0,
    });
    callAPI({
      url,
      data: uploadData,
      token,
      contentType: "form",
      onUploadProgress: (progress) => {
        updateNotification({
          id: notificationId,
          progress: (progress * 60) / 100,
        });
        setProgress(progress);
      },
      onSuccess: (result) => {
        onSuccess(result);
        updateNotification({
          id: notificationId,
          msg: `Image${numFiles > 1 ? "s" : ""} successfully uploaded`,
          type: "success",
          progress: 100,
        });
      },
      onError: (err) => {
        console.log(err);
        updateNotification({
          id: notificationId,
          msg: "Something went wrong with the upload",
          type: "failure",
        });
      },
    });
  }

  return (
    <>
      <UploadNotifications />
      <AiOutlineCloudUpload
        role="button"
        aria-label="open upload dialog"
        onClick={() => setOpen(true)}
        className="absolute right-0 text-2xl"
      />
      {isOpen && (
        <div className="w-full h-full inset-0 flex fixed z-30 p-10 bg-black bg-opacity-30">
          <div className="flex flex-col bg-page m-auto rounded-lg p-10 min-h-52 h-3/5 max-w-xl w-4/5">
            <div className="mb-4" {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
              {thumbs && thumbs.length > 0 && (
                <aside className="flex flex-wrap w-full overflow-y-auto h-full">
                  {thumbs}
                </aside>
              )}
            </div>
            <div className="h-1/12 flex">
              {filesToUpload.length > 0 && (
                <Button className=" mr-2 rounded-lg" onClick={handleUpload}>
                  Upload
                </Button>
              )}
              <Button
                className="rounded-lg"
                onClick={() => setOpen(false)}
                variant="danger"
                color="red-500"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
