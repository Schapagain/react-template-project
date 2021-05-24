import React from "react";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { Alert } from "../../design-system/form";

/**
 *
 * @param {*} props
 * @param {String} scope
 * @param {Array<String>} scopes
 * @returns
 */
export default function Notifications({ scope, scopes }) {
  const { notifications } = useNotificationContext();
  return (
    <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-40 p-2">
      {notifications.map(
        (notification) =>
          (notification.scope === scope ||
            scopes.includes(notification.scope)) && (
            <Alert {...notification} key={notification.id} />
          )
      )}
    </div>
  );
}

Notifications.defaultProps = {
  scopes: [],
};
