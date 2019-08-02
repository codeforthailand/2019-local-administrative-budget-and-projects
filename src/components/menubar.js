import React from 'react'

import MediaQuery from 'react-responsive';

const MenuBar = ({onLeftClick, title, onRightClick}) => {
    return <div>
        <MediaQuery query="(orientation: portrait)">
            <div style={{
                position: "absolute", borderTop: "1px solid black",
                right: 0, bottom: 0, background: "white",
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "100%"
            }}>
                <span style={{
                    cursor: "pointer",
                    borderRight: "1px solid",
                    padding: "10px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    }}
                    onClick={onLeftClick} 
                >
                    ←
                </span>
                <span
                style={{
                    width: "100%", textAlign: "center", display: "inline-block",
                    verticalAlign: "top",
                }}
                >
                    {title}
                </span>
                <span style={{
                    cursor: "pointer",
                    borderLeft: "1px solid",
                    padding: "10px",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    }}
                    onClick={onRightClick}
                >
                    →
                </span>
            </div>
        </MediaQuery>
        <MediaQuery query="(orientation: landscape)">
            <div style={{
                position: "absolute", border: "1px solid black",
                right: "5vh", bottom: "5vh", background: "white", borderRadius: "10px" }}>
                <span style={{
                    padding: "10px", cursor: "pointer"
                    }}
                    onClick={onLeftClick} 
                >
                    ←
                </span>
                <span
                style={{
                    width: "20rem", textAlign: "center", display: "inline-block",
                    borderRight: "1px solid black",
                    borderLeft: "1px solid black",
                    verticalAlign: "top",
                }}
                >
                    {title}
                </span>
                <span style={{
                    padding: "10px", cursor: "pointer"
                    }}
                    onClick={onRightClick}
                >
                    →
                </span>
            </div>
        </MediaQuery>
    </div>
}

export default MenuBar