import React from "react"

import { DESKTOP_MIN_WIDTH, MOBILE_CONTENT_PADDING, media } from "../shared/style"

const isDev = true

const TextBox = ({name, children}) => {
    return <div css={{
        width: "100%",
        margin: "0px auto 10px auto",
        padding: `0 ${MOBILE_CONTENT_PADDING}px`,
        [media(DESKTOP_MIN_WIDTH)]: {
            width: `${DESKTOP_MIN_WIDTH}px`,
            padding: "0px",
        }
    }}>
        {isDev && name && <a href={`#${name}`} id={name} css={{color: "red"}}>(ย่อหน้า: {name})</a>}
        {children}
    </div>
}


export default TextBox