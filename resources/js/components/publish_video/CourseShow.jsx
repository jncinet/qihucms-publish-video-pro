import React from "react";

export default props => {
    return (
        <div className="vw-100 vh-100 position-relative">
            <video src={props.src}
                   className="d-block bg-black vw-100 vh-100" webkit-playsinline="true"
                   x-webkit-airplay="allow" playsInline x5-video-player-type="h5-page"
                   x5-video-orientation="portrait" x5-video-player-fullscreen="true"
                   width="100%" height="100%" autoPlay>
                暂不支持视频预览
            </video>
        </div>
    );
};