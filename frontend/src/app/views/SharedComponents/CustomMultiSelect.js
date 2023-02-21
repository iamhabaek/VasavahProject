import React from "react";
import Select from "react-select";
import { useField } from "formik";
export default function SelectField(props) {
  const [field, state, { setValue, setTouched }] = useField(props.field.name);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <Select
      {...props}
      value={state?.value}
      isMulti
      closeMenuOnSelect={false}
      onChange={onChange}
      onBlur={setTouched}
    />
  );
}
