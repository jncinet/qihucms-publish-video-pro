import React from 'react';

/**
 * 发布页顶部回退按钮
 *
 * @param props
 * @returns {*}
 */
export default props => {
    return (
        <div onClick={props.goBack} className="go-back">
            <i className="iconfont icon-houtuishangyige text-white font-size-22 text-white-50 font-weight-bold"
               aria-hidden="true"/>
        </div>
    );
}