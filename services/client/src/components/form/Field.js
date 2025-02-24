import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { BiHide, BiShow } from "react-icons/bi";

import Error from "./Error";

function FormField({
  name,
  label,
  className,
  containerClassName,
  testId,
  showPassword,
  fn,
  labelFor,
  length,
  showLength = false,
  ...otherProps
}) {
  const { values, setFieldTouched, setFieldValue, handleChange, errors, touched } = useFormikContext();
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={"form-control " + containerClassName}>
        <div className="-mb-4">
          {label && (
            <label className="label">
              <span className="label-text text-md font-semibold mt-1 pb-4">
                {label}
                <span className="text-primary font-bold">{otherProps.required ? " *" : ""}</span>
                {`${showLength ? "(" + length + ")" : ""}`}
              </span>
            </label>
          )}
        </div>
        <input
          style={{ outline: "none" }}
          className={"input focus:outline-0 focus:border-0  " + className}
          value={values[name]}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => {
            setFieldValue(name, e.target.value);
            handleChange(name);
            if (fn) {
              fn(e.target.value);
            }
          }}
          type={showPassword && show ? "text" : "password"}
          {...otherProps}
        />
        {showPassword ? (
          <>
            <label
              onClick={() => setShow(!show)}
              className="w-10 rounded px-2 py-1 text-sm hover:text-gray-700 text-gray-600 text-right -mt-9 mr-3 ml-auto"
              htmlFor="toggle"
            >
              {show ? <BiHide size={"20px"} className="" /> : <BiShow size={"20px"} className="" />}
            </label>
          </>
        ) : null}
        <Error testId={testId} error={errors[name]} visible={touched[name]} />
      </div>
    </>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  appendText: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  testId: PropTypes.string,
  showPassword: PropTypes.bool,
  showLength: PropTypes.bool,
  length: PropTypes.number,
  fn: PropTypes.func,
  labelFor: PropTypes.string,
};

export default FormField;
