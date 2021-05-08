import React, { useState } from "react";

export default function useForm(initialState) {
  const [form, setForm] = useState(initialState || {});
  const handleFormChange = (e) =>
    e &&
    setForm(
      e.target
        ? { ...form, [e.target.name]: e.target.value }
        : { ...form, ...e }
    );

  return [form, handleFormChange];
}
