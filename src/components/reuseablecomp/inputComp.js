import React from 'react'

const InputComp = ({ inputType, onchangeFunc, placeholder, style, filedName }) => {
    return (
        <>
            <input type={inputType} onChange={onchangeFunc} placeholder={placeholder} style={style} name={filedName} />
        </>
    )
}

export default InputComp