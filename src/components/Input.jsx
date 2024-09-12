import React from "react";
import { classNames } from "../utils";

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        "bg-transparent rounded-xl outline-none border-[1px] px-5 py-3 text-base md:text-lg focus:border-purple-500 border-white",
        props.className || ""
      )}
    />
  );
});

export default Input;
