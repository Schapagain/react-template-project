import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";

const defaultImage =
  "https://s3-ap-southeast-1.amazonaws.com/npl-test-001/Mth%20One/photo-5.jpeg";

const sampleCollections = [
  {
    id: 1,
    imageCount: 2,
    images: [
      {
        id: 1,
        src: defaultImage,
      },
      {
        id: 2,
        src: defaultImage,
      },
    ],
  },
  {
    id: 2,
    imageCount: 3,
    images: [
      {
        id: 1,
        src: defaultImage,
      },
      {
        id: 2,
        src: defaultImage,
      },
      {
        id: 3,
        src: defaultImage,
      },
    ],
  },
];

/**
 * @param {Object} props
 * @param {String} props.url
 * @param {String} props.urls - list of urls to fetch and merge data from
 * @param {Array | any} refresh - dependenc(y/ies) to trigger useEffect
 * @param {Boolean} props.doFetch - Whether to actually fetch data using the given configs
 * @param {Function} props.makeData - Optinal callback to create the 'data' object in case the API response doesn't follow the standards
 */
const useFetch = ({ url, urls = [], refresh, doFetch = true, makeData }) => {
  const [data, setData] = useState({ results: sampleCollections });
  const [requestError, setRequestError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, token } = useAuthContext();

  let depArray = Array.isArray(refresh)
    ? [...refresh, isAuthenticated, url, ...urls, doFetch]
    : [refresh, isAuthenticated, url, ...urls, doFetch];

  urls = url ? [...urls, url] : urls;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setRequestError(null);
      try {
        console.log("in useFecth (common):", urls);
        const results = await Promise.all(
          urls.map((url) =>
            axios.request(
              _makeConfig({
                url,
                token,
                isAuthenticated,
              })
            )
          )
        );
        const newData = {};
        results.forEach((result) => {
          const tempData = makeData
            ? makeData(result)
            : Array.isArray(result.data)
            ? { count: result.data.length, results: result.data }
            : result.data;
          newData.count = (tempData.count || 0) + (newData.count || 0);
          newData.results = [...(newData.results || []), ...tempData.results];
        });
        console.log("fetch data:::", newData);
        setData(newData);
      } catch (error) {
        console.log(error);
        setRequestError(error);
      } finally {
        setLoading(false);
      }
    }
    if (urls.length && doFetch) fetchData();
  }, depArray);

  return { data, loading, requestError };
};

export default useFetch;

function _makeConfig({ url, token, isAuthenticated }) {
  return {
    method: "get",
    baseURL: API_ENDPOINT,
    url,
    headers: isAuthenticated
      ? {
          Authorization: token,
        }
      : {},
  };
}
