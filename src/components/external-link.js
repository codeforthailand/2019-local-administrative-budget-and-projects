import React from 'react'

const ExternalLink = ({name, url}) => {
    return <a style={{color: "black"}}
        href={url} target="_blank" rel="noopener noreferrer"
        >
            {name}
        </a>
}


export default ExternalLink