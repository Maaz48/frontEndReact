import React from 'react'

const ButtonComp = ({ btnValue, clickEvent, name }) => {
    
    return (
        <button onClick={clickEvent} value={name}>{btnValue}</button>
    )
}

export default ButtonComp