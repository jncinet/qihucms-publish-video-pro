import React from "react";
import localForage from "localforage";

class LocalVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localVideo: {}
        }
    }

    componentDidMount() {
        localForage.getItem('video_index').then(index => {
            if (index === null) {
                this.setState({localVideo: {}});
            } else {
                localForage.getItem("video_data").then(data => {
                    if (data === null) {
                        this.setState({localVideo: {}});
                    } else {
                        const localVideo = data[index];
                        if (localVideo.link !== null) {
                            localVideo.src = localVideo.link;
                        }
                        this.setState({localVideo});
                    }
                })
            }
        });
    }

    render() {
        return this.state.localVideo.hasOwnProperty("src") && (
            <div className="text-center">
                <video src={this.state.localVideo.src} autoPlay={true}
                       className="d-block bg-black w-50 mx-auto rounded mb-2" webkit-playsinline="true"
                       x-webkit-airplay="allow" playsInline x5-video-player-type="h5-page"
                       x5-video-orientation="portrait" x5-video-player-fullscreen="true" width="50%">
                    暂不支持视频预览
                </video>
                <button onClick={() => this.props.callback(this.state.localVideo.src)} className="btn btn-primary w-50">
                    使用此视频{this.props.btnText}
                </button>
                <div className="font-size-12 text-999 mt-2 px-3">备注：查看其它，可在顶部搜索框中输入关键词查询。</div>
            </div>
        );
    }
}

export default LocalVideo;