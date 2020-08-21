import React from "react";
import localForage from "localforage";

class LocalVideo extends React.Component {
    constructor(props) {
        super(props);
        this.video = React.createRef();
        this.handleMuted = this.handleMuted.bind(this);
        this.state = {
            videoSrc: null,
            muted: true
        }
    }

    handleMuted() {
        const v = this.video.current;
        if (v.muted) {
            v.muted = false;
            this.setState({muted: false});
        } else {
            v.muted = true;
            this.setState({muted: true});
        }
    }

    componentDidMount() {
        localForage.getItem('video_index').then(index => {
            if (index !== null) {
                localForage.getItem("video_data").then(data => {
                    if (data) {
                        const item = data[index];
                        let videoSrc = null;
                        if (item.hasOwnProperty('link') && item.link !== null) {
                            videoSrc = item.link;
                        } else if (item.hasOwnProperty('src') && item.src !== null) {
                            videoSrc = item.src;
                        }
                        this.setState({videoSrc});
                    }
                })
            }
        });
    }

    render() {
        return this.state.videoSrc && (
            <div>
                <video src={this.state.videoSrc} autoPlay={true} ref={this.video}
                       className="d-block bg-black w-50 mx-auto rounded mb-2" webkit-playsinline="true"
                       x-webkit-airplay="allow" playsInline x5-video-player-type="h5-page" muted={this.state.muted}
                       x5-video-orientation="portrait" x5-video-player-fullscreen="true" width="50%">
                    暂不支持视频预览
                </video>
                <button onClick={this.handleMuted} className="btn btn-block btn-secondary w-50 mx-auto">
                    {this.state.muted ? '取消静音' : '静音播放'}
                </button>
                <button onClick={() => this.props.callback(this.state.videoSrc)}
                        className="btn btn-block btn-primary w-50 mx-auto">
                    使用此视频{this.props.btnText}
                </button>
                <div className="font-size-12 text-999 mt-2 px-3">备注：查看其它，可在顶部搜索框中输入关键词查询。</div>
            </div>
        );
    }
}

export default LocalVideo;