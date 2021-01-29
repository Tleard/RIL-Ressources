import React from 'react'

// Custom Button component. Named "Btn" so it does not conflict with the "Button" component from reactstrap. The onClick property may be used to pass function if needed.  
const Btn = ({bgColor, foColor, text, onClick}) => {
    return (
        <button onClick={onClick} style={{backgroundColor: bgColor, color: foColor}} className='btn'>{text}</button>
    )
}

export default Btn
