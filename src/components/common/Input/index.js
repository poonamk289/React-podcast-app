import React from "react";
import "./style.css";

function InputComponent({type,state,setState,placeholder,required}){
    return (
        <input
            type={type}
            value={state}
            onChange={(e)=>setState(e.target.value)}
            placeholder={placeholder}
           
            className="custom-input"
            required={required}
        />
    )
}
export default InputComponent;