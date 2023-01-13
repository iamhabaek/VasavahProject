import React from "react";
import Select from "react-select";

export default ({ onChange, options, value, className }) => {
  // set default value
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  return (
    <div className={className}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        // isMulti
        options={options}
      />
    </div>
  );
};
