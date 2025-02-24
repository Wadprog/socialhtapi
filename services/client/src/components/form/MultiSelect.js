import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import _ from "lodash";
import { Select, MenuItem } from "@mui/material";
import Error from "./Error";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function FormSelectMulti({ name, label, options, className, testId, link, isMulti, fn, val, ...otherProps }) {
  const { setFieldTouched, setFieldValue, handleChange, errors, touched } = useFormikContext();
  return (
    <>
      <div className="form-control mt-3">
        <span className="label-text text-md font-semibold">
          {label}
          <span className="text-primary font-bold">{otherProps.required ? " *" : ""}</span>
        </span>
        <Select
          className={"select w-full font-normal capitalize " + className}
          placeholder={"Select " + label}
          value={val}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            handleChange(name);
            fn(e);
          }}
          MenuProps={MenuProps}
          {...otherProps}
        >
          <MenuItem className="font-normal !capitalize ">{"Not specified"}</MenuItem>
          {options?.length > 0
            ? options?.map((option) => {
                return !_.isEqual(option?.label, "Not specified") ? (
                  <MenuItem className="font-normal !capitalize " key={option?.id} value={option?.label}>
                    {option?.label}
                  </MenuItem>
                ) : (
                  ""
                );
              })
            : ""}
        </Select>
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormSelectMulti.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  testId: PropTypes.string,
  link: PropTypes.string,
  options: PropTypes.any.isRequired,
  isMulti: PropTypes.bool,
  fn: PropTypes.func,
  val: PropTypes.array,
};

export default FormSelectMulti;
