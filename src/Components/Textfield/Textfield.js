import * as React from "react";

import "./textfield.scss";

const sizeClasses = {
  small: "textfield-small",
  large: "textfield-large",
};

const Textfield = (props) => {
  const {
    label,
    id,
    value,
    onChange,
    size,
    leftIcon,
    rightIcon,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [textValue, setTextValue] = React.useState(value || "");

  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    setTextValue(value || "");
  }, [value]);

  const onFocused = () => {
    setIsFocused(true);
  };

  const onBlured = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const onHover = () => {
    setIsHovered(true);
  };

  const onLeave = () => {
    setIsHovered(false);
  };
  const onChangeValue = (e) => {
    setTextValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  // const sizeClassName = () => {
  // switch (size) {
  //   case "large":
  //     return "textfield-large";
  //   case "small":
  //     return "textfield-small";
  //   default:
  //     return "";
  // }
  // };

  const inoutId = id || `textfield-${Math.floor(Math.random() * 1000)}`;

  return (
    <div className={`box-input ${sizeClasses[size] || ""}`}>
      {label && <label className="label-title" htmlFor={inoutId}>{label}</label>}
      <div
        className="groupe-input"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {leftIcon && (
          <label htmlFor={inoutId} className="icon icon-left">
            {leftIcon}
          </label>
        )}
        <input
          id={inoutId}
          onChange={onChangeValue}
          value={textValue}
          onFocus={onFocused}
          onBlur={onBlured}
          {...rest}
        />
        {rightIcon && (
          <label htmlFor={inoutId} className="icon icon-right">
            {typeof rightIcon === "function"
              ? rightIcon({ isHovered, isFocused })
              : rightIcon}
          </label>
        )}
      </div>
    </div>
  );
};

export default Textfield;
