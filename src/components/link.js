import React from "react"

const Link = ({children, href}) => {
    return <a style={{color: "black", textDecoration:"none"}} href={href}
        target="_blank" rel="noopener noreferrer"
    >
        {children}
    </a>
}

export default Link