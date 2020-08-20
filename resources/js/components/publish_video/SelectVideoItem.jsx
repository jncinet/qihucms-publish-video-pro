import React from "react";

class SelectVideoItem extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePlayEnded = this.handlePlayEnded.bind(this);
        this.state = {
            videoStatus: false,
        };
    }

    handlePlay() {
        this.setState(prevState => ({videoStatus: !prevState.videoStatus}));
    }

    handlePlayEnded() {
        this.setState({videoStatus: false});
    }

    render() {
        return (
            <div className="w-33 pr-2 mb-2">
                <div onClick={this.handlePlay}
                    className="d-flex justify-content-center align-items-center w-100 vh-26 overflow-hidden bg-black rounded">
                    {
                        this.state.videoStatus ? (
                            <video src={this.props.src} poster={this.props.poster} className="d-block w-100"
                                   webkit-playsinline="true" x-webkit-airplay="allow" width="100%" playsInline
                                   x5-video-player-type="h5-page" x5-video-orientation="portrait"
                                   x5-video-player-fullscreen="true" autoPlay={true} onEnded={this.handlePlayEnded}>
                                暂不支持视频预览
                            </video>
                        ) : (
                            <img width="100%" src={this.props.poster} alt={this.props.src}/>
                        )
                    }
                </div>
                <div className="btn-group d-flex pt-1" role="group">
                    <button onClick={this.handlePlay} className="btn btn-sm btn-warning flex-grow-1">
                        {this.state.videoStatus ? "停止" : "播放"}
                    </button>
                    <button onClick={() => this.props.callback(this.props.src)}
                            className="btn btn-sm btn-primary flex-grow-1">
                        {this.props.btnText}
                    </button>
                </div>
            </div>
        );
    };
}

export default SelectVideoItem;