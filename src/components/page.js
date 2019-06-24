import React from "react"

const Page = ({children}) => {
    return <div style={{background: "#ccc", width: "100%", padding: "10px"}}>
        {children}
    </div>
}

export default Page