import React from "react";

export default props => {
    return (
        <div onClick={() => props.callback()}>
            <div
                className="d-flex justify-content-center align-items-center rounded-circle box-show lg-circle-wrap">
                <div
                    className="d-flex justify-content-center align-items-center rounded-circle lg-circle-ico">
                    {
                        props.reset && (
                            <i className="iconfont icon-shuaxin1 font-size-22 text-white-50 line-height-1"
                               aria-hidden="true"/>
                        )
                    }
                </div>
            </div>
            <div className="text-center text-white mt-2 text-shadow">{props.reset ? '重拍' : '拍摄'}</div>
        </div>
    );
}