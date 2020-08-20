import React from "react";

export default props => {
    return (
        <div className="d-flex align-items-center py-1">
            <div className="position-relative">
                <img width={50} className="d-block rounded" src={props.cover} alt={props.title}/>
                <div onClick={() => props.onPlay(props.id)} style={{left: 0, top: 0, zIndex: 9}}
                     className="position-absolute d-flex w-100 h-100 justify-content-center align-items-center">
                    {
                        props.playing ?
                            <i className="iconfont icon-zanting font-size-22 text-white" aria-hidden={true}/> :
                            <i className="iconfont icon-bofang2 font-size-22 text-white" aria-hidden={true}/>
                    }
                </div>
                {
                    props.playing && (
                        <audio onEnded={() => props.onPlay("")} className="d-none" src={props.url}
                               autoPlay={true}>暂不支持音频播放</audio>
                    )
                }
            </div>
            <div className="ml-2 pl-1 mr-auto">
                <div>{props.title}</div>
                <div className="text-999 line-height-1 mt-1 font-size-14">{props.author}</div>
            </div>
            <div className="bg-primary rounded px-3 py-1 font-size-14"
                 onClick={() => props.onCallback(props.id)}>使用</div>
        </div>
    )
};