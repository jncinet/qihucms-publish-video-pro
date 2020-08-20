import React from "react";
import BottomIco from "./BottomIco.jsx";
import BottomBtn from "./BottomBtn.jsx";

class VideoPreview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.videoMount = React.createRef();
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.setVideoMuted = this.setVideoMuted.bind(this);
        this.setVideoPlaybackRateSlow = this.setVideoPlaybackRateSlow.bind(this);
        this.setVideoPlaybackRateFast = this.setVideoPlaybackRateFast.bind(this);
        this.bottomLeftBtn = this.bottomLeftBtn.bind(this);
        this.state = {
            videoPaused: false,
            videoPlaybackRate: null,
            videoMuted: true,
        };
    }

    bottomLeftBtn() {
        switch (this.props.precessType) {
            case "tk":
                return <BottomIco className="icon-jingcailuzhi font-size-20"
                                  callback={() => this.props.selectVideo("tk")}>同款</BottomIco>;
            case "hp":
                return <BottomIco className="icon-jingcailuzhi font-size-20"
                                  callback={() => this.props.selectVideo("hp")}>合拍</BottomIco>;
            case "yj":
                return <BottomIco className="icon-image font-size-20"
                                  callback={() => this.props.selectImage()}>图片</BottomIco>;
            default:
                return <BottomIco className="icon-yinfu1 font-size-20"
                                  callback={() => this.props.selectBackgroundAudio()}>音乐</BottomIco>;
        }
    }

    // 视频播放
    handlePlay() {
        const v = this.videoMount.current;
        if (v.paused) {
            v.play();
        }
        this.setState({videoPaused: false});
    }

    // 视频暂停
    handlePause() {
        const v = this.videoMount.current;
        if (!v.paused) {
            v.pause();
        }
        this.setState({videoPaused: true});
    }

    // 视频慢放
    setVideoPlaybackRateSlow() {
        const v = this.videoMount.current;
        if (v.paused) {
            v.play();
        }
        if (v.playbackRate === 0.5) {
            v.playbackRate = 1;
            this.setState({videoPaused: false, videoPlaybackRate: null});
        } else {
            v.playbackRate = 0.5;
            this.setState({videoPaused: false, videoPlaybackRate: "slow"});
        }
    }

    // 视频快放
    setVideoPlaybackRateFast() {
        const v = this.videoMount.current;
        if (v.paused) {
            v.play();
        }
        if (v.playbackRate === 1.5) {
            v.playbackRate = 1;
            this.setState({videoPaused: false, videoPlaybackRate: null});
        } else {
            v.playbackRate = 1.5;
            this.setState({videoPaused: false, videoPlaybackRate: "fast"});
        }
    }

    // 视频静音
    setVideoMuted() {
        const v = this.videoMount.current;
        if (v.muted) {
            v.muted = false;
            this.setState({videoMuted: false});
        } else {
            v.muted = true;
            this.setState({videoMuted: true});
        }
    }

    render() {
        return (
            <div className="vw-100 position-relative">
                <video onPlay={this.handlePlay} onPause={this.handlePause}
                       src={this.props.videoPreviewUrl.length > 0 ? this.props.videoPreviewUrl : this.props.videoSourceUrl}
                       className="d-block bg-black vw-100 vh-100" webkit-playsinline="true"
                       x-webkit-airplay="allow" playsInline x5-video-player-type="h5-page"
                       x5-video-orientation="portrait" x5-video-player-fullscreen="true"
                       width="100%" height="100%" autoPlay ref={this.videoMount} muted={this.state.videoMuted}>
                    暂不支持视频预览
                </video>
                <div className="position-absolute text-white-50 absolute-right-center">
                    <div className={"text-center mb-3" + (this.state.videoMuted ? " text-white" : "")}
                         onClick={this.setVideoMuted}>
                        <i className="iconfont icon-jingyin font-size-30 line-height-1" aria-hidden="true"/>
                        <div className="font-size-12">静音</div>
                    </div>
                    <div className={"text-center mb-3" + (this.state.videoPlaybackRate === "slow" ? " text-white" : "")}
                         onClick={this.setVideoPlaybackRateSlow}>
                        <i className="iconfont icon-manfang font-size-30 line-height-1" aria-hidden="true"/>
                        <div className="font-size-12">慢放</div>
                    </div>
                    {
                        this.state.videoPaused ? (
                            <div className="text-center mb-3 text-white" onClick={this.handlePlay}>
                                <i className="iconfont icon-bofang2 font-size-30 line-height-1" aria-hidden="true"/>
                                <div className="font-size-12">播放</div>
                            </div>
                        ) : (
                            <div className="text-center mb-3 text-white" onClick={this.handlePause}>
                                <i className="iconfont icon-zanting font-size-30 line-height-1" aria-hidden="true"/>
                                <div className="font-size-12">暂停</div>
                            </div>
                        )
                    }
                    <div className={"text-center mb-3" + (this.state.videoPlaybackRate === "fast" ? " text-white" : "")}
                         onClick={this.setVideoPlaybackRateFast}>
                        <i className="iconfont icon-kuaifang font-size-30 line-height-1" aria-hidden="true"/>
                        <div className="font-size-12">快放</div>
                    </div>
                </div>
                <div className="position-absolute vw-100 absolute-bottom">
                    <div className="d-flex justify-content-around align-items-end px-5 pb-3">
                        {
                            this.bottomLeftBtn()
                        }
                        {
                            this.props.precessType !== "yj" && (
                                <BottomBtn callback={() => this.props.selectFile()}
                                           reset={this.props.videoPreviewUrl.length > 0}/>
                            )
                        }
                        <BottomIco className="icon-zhifeiji"
                                   callback={() => this.props.redirectPublish()}>发布</BottomIco>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPreview;