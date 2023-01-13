import React from "react";
import Select from "react-select";
import { useField } from "formik";
export default function SelectField(props) {
  // field properties from formik field
  const [field, state, { setValue, setTouched }] = useField(props.field.name);
  console.log(state);

  // Chnage value to an array
  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Select
      {...props}
      value={state?.value}
      isMulti
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
