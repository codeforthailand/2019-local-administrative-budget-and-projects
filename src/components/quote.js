import React from "react"

const Quote = ({text, fontSize="2rem", lineHeight="2.5rem"}) => {
    return <div style={{ fontSize: fontSize, lineHeight: lineHeight }}>
        <span style={{fontFamily: "sans-serif", fontSize: "8rem", verticalAlign: "top"}}>“</span>
        <span>{text}</span>
    </div>
}


export default Quote