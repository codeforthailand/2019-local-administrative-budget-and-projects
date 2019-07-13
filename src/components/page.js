import React from "react"

const Page = ({header, children}) => {
    return <div style={{
            padding: "1em",
        }}>
        <h2>{header}</h2>
        <div style={{marginTop: "10vh"}}>
            <div style={{width: "70%", float: "left"}}>
                <div style={{padding: "1em"}}>
                    {children[0]}
                </div>
            </div>
            <div style={{width: "30%", float: "left"}}>
                {children[1]}
            </div>
        </div>
    </div>
}

export default Page