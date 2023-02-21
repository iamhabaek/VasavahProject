import React from "react";
import { Field } from "formik";
import Select from "react-select";
export default function MultiSelect({ options, ...props }) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <Select
          {...field}
          {...props}
          options={options}
          onChange={(value) => {
            form.setFieldValue(props.name, value);
            form.setFieldValue("startTime", "");
            form.setFieldValue("endTime", "");
          }}
        />
      )}
    </Field>
  );
}
