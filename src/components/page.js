import React from "react"

const Page = ({header, children}) => {
    return <div style={{padding: "1em", border: "1px dotted #ddd"}}>
        <h1>{header}</h1>
        <div style={{marginLeft: "70%", marginTop: "20vh"}}>
            {children}
        </div>
    </div>
}

export default Page