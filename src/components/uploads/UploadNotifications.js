import React, { useEffect } from "react";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { TiDelete } from "react-icons/ti";

const Notification = ({ progress, msg, id, type }) => {
  const { removeNotification } = useNotificationContext();

  useEffect(() => {
    if (type == "failure") {
      setTimeout(() => removeNotification(id), 10000);
    }
    if (progress == "100") {
      setTimeout(() => removeNotification(id), 1500);
    }
  }, [progress, type]);

  const handleRemove = () => {
    removeNotification(id);
  };

  return (
    <div className="relative p-2 rounded-md pb-3 my-2 bg-gray-300 animate-fade-in">
      <p>{msg}</p>
      <div aria-hidden={true} className="absolute w-full bottom-0 left-0 h-1">
        <span
          className={`h-full transition-width duration-300 linear block ${
            type === "failure" ? "bg-red-500" : "bg-green-500"
          }`}
          style={{
            width: `${progress}%`,
          }}
        ></span>
      </div>
      <TiDelete
        role="button"
        aria-label="remove notification"
        onClick={handleRemove}
        className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2 text-xl"
      />
    </div>
  );
};

export default function UploadNotifications() {
  const { notifications } = useNotificationContext();
  return (
    <div className="fixed bottom-2 left-0 w-60 z-40 p-2">
      {notifications.map(
        (notification) =>
          notification.scope === "upload" && (
            <Notification {...notification} key={notification.id} />
          )
      )}
    </div>
  );
}
