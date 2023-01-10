import React from "react";
import "./Button.scss";
const classeColor = {
  khrawi: "yellow-btn",
  orange: "orange-btn",
  green: "green-btn",
  red: "red-btn",
  gray: "gray-btn"
};
const classesize = {
  large: "large-btn",
  small: "small-btn",
};

const classBorderRadius = {
  borderRadius4 : "brd-4",
  borderRadius8 : "brd-8",
  borderRadius50 : "brd-50",
}

const Button = ({ children, color, size, borderRadius, ...rest }) => {
  return (
    <div className={`${classeColor[color]} ${classesize[size]} ${classBorderRadius[borderRadius]}`}>
      <button {...rest}>{children}</button>
    </div>
  );
};

export default Button;
