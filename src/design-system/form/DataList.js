import React, { useEffect, useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";

const Tag = ({ text, onRemove, isLoading = true }) => (
  <div className="p-1 flex m-1 relative text-xxs bg-gray-200 rounded-full">
    <p className="h-fit-content my-auto">{text}</p>
    <p
      role="button"
      onClick={() => onRemove(text)}
      className="rounded-full ml-1 text-sm text-gray-500"
    >
      <TiDelete />
    </p>
    {isLoading && (
      <Loading position="absolute" className="rounded-full" size="20px" />
    )}
  </div>
);

export default function DataList({
  fetchUrl,
  fetchOptions: { makeOptions },
  values,
  onAdd,
  onRemove,
  isLoading,
  ...rest
}) {
  const [options, setOptions] = useState([]);
  const [tempValue, setTempValue] = useState("");
  const inputRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempValue) onAdd(tempValue);
    setTempValue("");
  };

  const handleRemove = (keyword) => {
    onRemove(keyword);
    inputRef.current.focus();
  };

  const { data } = useFetch({
    url: fetchUrl,
  });

  useEffect(() => {
    setOptions(makeOptions(data));
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="bg-white w-full flex flex-wrap">
      {[...values].map((v) => (
        <Tag
          key={v}
          text={v}
          isLoading={isLoading === v}
          onRemove={handleRemove}
        />
      ))}
      <input
        ref={inputRef}
        className="focus:outline-none p-1 w-full"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        list="data"
        {...rest}
      />
      <datalist style={{ maxHeight: "100px" }} className="text-xs" id="data">
        {options.map((option) => (
          <option className="text-xs" key={option.toString()} value={option} />
        ))}
      </datalist>
    </form>
  );
}

DataList.defaultProps = {
  onAdd: () => null,
  onRemove: () => null,
  options: [],
  values: [],
  fetchOptions: {},
};
