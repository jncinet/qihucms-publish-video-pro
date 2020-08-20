import React from "react";

export default props => {
    return (
        <div>
            <div onClick={() => props.onClose()} className={"qh-mask" + (!props.visible ? ' qh-mask-hide' : '')}/>
            <div className={"qh-popup" + (!props.visible ? ' qh-popup-hide' : '')}>
                {props.children}
            </div>
        </div>
    );
}