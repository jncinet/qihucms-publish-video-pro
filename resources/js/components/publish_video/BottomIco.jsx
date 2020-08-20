import React from "react";

export default props => {
    return (
        <div onClick={() => props.callback()}>
            <div
                className="d-flex justify-content-center align-items-center box-show sm-circle-ico">
                <i className={"iconfont line-height-1 text-white " + props.className}
                   aria-hidden="true"/>
            </div>
            <div className={"text-center text-white mt-2 text-shadow font-size-14"}>
                {props.children}
            </div>
        </div>
    );
}