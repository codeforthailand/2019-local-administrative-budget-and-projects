import React from "react"

import {globalConfig} from "../constant"


const getIndex = (url) => {
    const counter = globalConfig.references.findIndex(d => d === url)
    if (counter === -1){
        globalConfig.references.push(url)
        return getIndex(url)
    }
    
    return counter + 1
}

const Reference = ({url, color="black"}) => {
    const counter = getIndex(url)

    return <a style={{ textDecoration: "none", color: color }}
            href={url} target="_blank" rel="noopener noreferrer"
        >
        [{counter}]
    </a>
}

export default Reference