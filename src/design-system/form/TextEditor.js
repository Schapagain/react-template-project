import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { AuthContext } from "../../../backend/contexts/AuthContext";
import { performBatchAction } from "../../utils";

export default function TextEditor({ value, onChange }) {
  const { authState } = useContext(AuthContext);

  const customConfig = {
    extraPlugins: [CK_UploadAdapterPlugin],
  };

  function CK_UploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new UploadAdapter(loader);
    };
  }

  const UploadAdapter = function (loader) {
    this.loader = loader;
    this.upload = () => {
      this.loader.uploadTotal = 100;
      return new Promise(async (resolve, reject) => {
        this.loader.file.then((file) => {
          uploadFile({
            data: file,
            onUploadProgress: (progress) => {
              this.loader.uploaded = progress;
            },
          })
            .then((result) => {
              resolve({ default: result.data.url });
            })
            .catch((err) => {
              console.log(err.response);
              reject("Couldn't upload file");
            });
        });
      });
    };
  };

  function uploadFile({ data, onUploadProgress }) {
    const form = new FormData();
    form.set("image", data);
    return performBatchAction({
      url: "/library/media/single/upload/",
      data: form,
      token: authState.token,
      method: "post",
      onUploadProgress,
      contentType: "form",
    });
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={customConfig}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
    />
  );
}

TextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

TextEditor.defaultProps = {
  onChange: () => null,
};
