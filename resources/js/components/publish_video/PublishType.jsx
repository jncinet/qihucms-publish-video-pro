import React from "react";

export default props => {
    return (
        <div className="vw-100 min-vh-100 d-flex flex-column align-items-center justify-content-center text-white-50">
            {props.children}
        </div>
    );
}