import React from "react";

class SetBgAutdio extends React.PureComponent {
    constructor(props) {
        super(props);
        this.audioMount = React.createRef();
        this.state = {
            audioStartTime: 0,
        }
    }

    handleTouchStart() {
    }

    handleTouchMove() {
    }

    handleTouchEnd() {
    }

    render() {
        return (
            <div className="position-absolute absolute-bottom">
                <div className="d-flex">
                    <div className="badge badge-dark">当前从 {this.state.audioStartTime} 秒开始</div>
                </div>
                <div onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}
                     onTouchEnd={this.handleTouchEnd} className="audio_soundbyte"
                     style={{width: '600px', transform: 'translateX(-53px)'}}/>
                <div className="d-none">
                    <audio ref={this.audioMount} src="http://qn.guileme.com/mp3/mp3.mp3" preload="auto">
                        暂不支持音频播放
                    </audio>
                </div>
            </div>
        );
    }
}

export default SetBgAudio;