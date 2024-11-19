import React from "react";

const Button = ({ type = "button", visual = "button", children, onClick, ...props }) => {
  const className = `btn btn-${visual}`; 
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;