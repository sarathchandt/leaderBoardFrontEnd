import React from "react";

type GradientButtonProps = {
    title:string;
    additionalStyles:string;
    onClick:(e:any)=>void
}

const GradientButton = ({additionalStyles,onClick,title}:GradientButtonProps) => {
  return (
    <button onClick={onClick}  className={additionalStyles}>
      {title}
    </button>
  );
};

export default GradientButton;
