import React from "react";

export default props => {
    return (
        <div className="my-2">
            <div className="d-flex align-items-center px-3" onClick={() => props.callback(props.id)}>
                <div
                    className="d-flex publish-type-item overflow-hidden justify-content-center align-items-center mr-2">
                    <img {...props.img}/></div>
                <div className="font-size-18">{props.title}</div>
            </div>
        </div>
    );
}