import React from "react";

export default function Input({type,label,placeholder,name,...rest}) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input name={name} {...rest} type={type ? type :"text"} placeholder={placeholder} className="input input-bordered" />
    </div>
  );
}
