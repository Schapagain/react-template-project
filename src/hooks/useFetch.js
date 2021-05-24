import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import api from "../utils/api";

/**
 * @param {Object} props
 * @param {String} props.url
 * @param {Array | any} refresh - dependenc(y/ies) to trigger useEffect
 * @param {Boolean} props.doFetch - Whether to actually fetch data using the given configs
 * @param {Function} props.makeData - Optinal callback to create the 'data' object in case the API response doesn't follow the standards
 */
const useFetch = ({ url, refresh, doFetch = true, makeData }) => {
  const [data, setData] = useState({ results: [] });
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, token } = useAuthContext();

  let depArray = Array.isArray(refresh)
    ? [...refresh, isAuthenticated, url, doFetch]
    : [refresh, isAuthenticated, url, doFetch];
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setRequestError(null);
      console.log("useFetch::", _makeConfig({ url, token }));
      try {
        const result = await api.request(
          _makeConfig({
            url,
            token,
          })
        );

        console.log("fetch result:::", result);
        if (result.data) {
          const newData = makeData
            ? makeData(result)
            : Array.isArray(result.data)
            ? { count: result.data.length, results: result.data }
            : result.data;

          setData(newData);
        }
      } catch (error) {
        console.log(error);
        setRequestError(error);
      } finally {
        setLoading(false);
      }
    }
    if (url && doFetch && isAuthenticated) fetchData();
  }, depArray);

  return { data, loading, requestError };
};

export default useFetch;

function _makeConfig({ url, token }) {
  return {
    method: "get",
    url,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}
