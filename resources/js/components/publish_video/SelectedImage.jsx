import React from "react";
import Popup from "./Popup.jsx";

class SelectedImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSelectMusic = this.handleSelectMusic.bind(this);
        this.handleMakeVideo = this.handleMakeVideo.bind(this);
        this.state = {
            visible: true
        };
    }

    handleMakeVideo() {
        this.props.handleMakeVideo();
        this.handleHidden();
    }

    handleSelectMusic() {
        this.props.selectBgAudio();
        this.handleHidden();
    }

    handleUpload() {
        this.props.onUpload();
        this.handleHidden();
    }

    handleHidden() {
        this.setState({visible: false});
        setTimeout(() => {
            this.props.onClose();
        }, 300);
    }

    render() {
        return (
            <Popup visible={this.state.visible} onClose={this.handleHidden}>
                <div className="text-center py-2 bg-white rounded-top qh-border-bottom">选择图片生成影集</div>
                <div className="d-flex vw-100 flex-wrap bg-white p-1">
                    {
                        (this.props.images || []).map(
                            (item, index) => (
                                <div key={index} className="w-33 vh-26 p-1 position-relative">
                                    <div
                                        className="w-100 h-100 d-flex justify-content-center align-items-center overflow-hidden bg-grey rounded">
                                        <img className="w-100" src={item.url} alt={item.src}/>
                                    </div>
                                    <div onClick={() => this.props.deleteImage(index)}
                                         className="position-absolute rounded-circle delete-image delete-image-select text-white">
                                        &times;
                                    </div>
                                </div>
                            )
                        )
                    }
                    {
                        (this.props.images || []).length < 9 && (
                            <div className="w-33 vh-26 p-1">
                                <div onClick={this.handleUpload}
                                     className="h-100 d-flex justify-content-center align-items-center bg-grey rounded">
                                    <i className="iconfont icon-jiahao font-size-34 text-black-50" aria-hidden={true}/>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-between text-center p-3 bg-grey">
                    <div onClick={this.handleHidden} className="py-1 px-3 bg-secondary text-white-50 rounded">取消生成</div>
                    <div onClick={this.handleSelectMusic} className="py-1 px-3 bg-danger rounded">背景音乐</div>
                    <div onClick={this.handleMakeVideo} className="py-1 px-3 bg-primary rounded">生成影集</div>
                </div>
            </Popup>
        );
    }
}

export default SelectedImage;