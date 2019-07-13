import React from "react"

const Placeholder = ({ name, width, height }) => (
    <div style={{
        border: "1px dotted black",
        display: "inline-block",
        width: width,
        height: height
    }}>
        {name}
    </div>

)


export default Placeholder