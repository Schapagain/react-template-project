import Axios from "axios";

const api = Axios.create({
  baseURL: API_ENDPOINT,
  timeout: 2500,
  headers: { Accept: "application/json" },
});
export default api;

/**
 * Send bulk payload over the network
 * @param {String} URL
 * @param {Object} payload
 * @param {String} token
 * @param {String} method - HTTP method to use
 * @param {String} contentType - form|json used to set headers
 * @param {Function} onDownloadProgress - callback fired on download progress change
 * @param {Function} onUploadProgress - callback fired on upload progress change
 * @param {Function} onSuccess - callback fired after the action
 * @param {Function} onUploadProgress - callback fired on upload progress change
 */
export async function callAPI({
  url,
  data,
  token,
  method = "post",
  contentType = "json",
  onUploadProgress = () => null,
  onDownloadProgress = () => null,
  onSuccess = () => null,
  onError = () => null,
}) {
  console.log(method || "post", "ing to", url, data);
  if (data && data.entries) {
    for (var key of data.entries()) {
      console.log(key[0] + " : " + key[1]);
    }
  }

  const request = Axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type":
        contentType === "json"
          ? "application/json"
          : "multipart/x-www-form-urlencoded",
    },
  });
  try {
    const result = await request.request({
      method: method || "post",
      data,
      url,
      onUploadProgress: (progressEvent) => {
        let progress = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        onUploadProgress(progress);
      },
      onDownloadProgress: (progressEvent) => {
        let progress = Math.floor(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        onDownloadProgress(progress);
      },
    });
    console.log("call api result:", result);
    onSuccess(result);
    return result;
  } catch (err) {
    onError(err);
    console.log(err.response);
  }
}
