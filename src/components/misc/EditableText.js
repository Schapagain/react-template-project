import { useNotificationContext } from "../../contexts/NotificationContext";
import React, { useEffect, useState } from "react";
import TextArea from "../../design-system/form/TextArea";
import { callAPI } from "../../utils/api";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "../../contexts/AuthContext";
import Notifications from "../misc/Notifications";

const ESC_KEY = 27;

export default function EditableText({
  className,
  text,
  saveUrl,
  makePayload,
  onSave,
}) {
  const [inEditMode, setEditMode] = useState(false);
  const [originalText, setOriginalText] = useState(text);
  const [_text, setText] = useState(text);

  const { addNotification } = useNotificationContext();
  const { token } = useAuthContext();

  useEffect(() => {
    setText(text);
    setOriginalText(text);
  }, [text]);

  const handleSave = async () => {
    if (_text !== originalText) {
      await callAPI({
        url: saveUrl,
        data: makePayload(_text),
        method: "put",
        token,
        onSuccess: () => {
          addNotification({
            id: uuid(),
            msg: "Text changed sucessfully",
            type: "success",
            scope: "text_edit",
            expiry: 1500,
          });
          setOriginalText(_text);
          onSave(_text);
          setEditMode(false);
        },
        onError: () => {
          addNotification({
            id: uuid(),
            msg: "Something went wrong while saving changes",
            type: "failure",
            scope: "text_edit",
            expiry: 5000,
          });
        },
      });
    } else {
      setEditMode(false);
    }
  };

  const handlKeyPress = (e) => {
    switch (e.keyCode) {
      case ESC_KEY:
        setText(originalText);
        setEditMode(false);
        break;
      default:
        return;
    }
  };

  return (
    <>
      <Notifications scope="text_edit" />
      {inEditMode ? (
        <TextArea
          onKeyDown={handlKeyPress}
          className="w-full mb-1"
          autoFocus={true}
          onBlur={handleSave}
          value={_text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className={className} onDoubleClick={() => setEditMode(true)}>
          {_text}
        </div>
      )}
    </>
  );
}

EditableText.defaultProps = {
  makePayload: () => null,
  onSave: () => null,
};
