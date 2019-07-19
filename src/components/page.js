import React from "react"

const Page = ({header, children}) => {
    return <div style={{
            padding: "1em",
        }}>
        <div style={{fontSize: "2.6rem", marginTop: "1rem", marginBottom: "1rem", lineHeight: "2.6rem"}}>
            {header}
        </div>
        <div>
            <div style={{width: "60%", float: "left"}}>
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