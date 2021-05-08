import React from "react";
import Select from "react-select";

import useFetch from "../../hooks/useFetch";
import ServerError from "../errors/ServerError";

export default function Selections({
  fetchURL,
  setSelections,
  value,
  ...rest
}) {
  const { data, loading, requestError } = useFetch({
    url: fetchURL,
  });

  const handleSelection = (items) => {
    if (items) {
      setSelections(items.map((item) => item.id));
    } else {
      setSelections([]);
    }
  };

  return requestError ? (
    <ServerError />
  ) : (
    <Select
      styles={{ menu: (provided) => ({ ...provided, zIndex: 9999 }) }}
      isLoading={loading}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) =>
        option.name ||
        option.title ||
        option.full_name ||
        option.username ||
        option
      }
      options={data.results}
      isMulti
      onChange={handleSelection}
      defaultValue={value}
      isClearable
      key={(option) => option.id}
      {...rest}
    />
  );
}
