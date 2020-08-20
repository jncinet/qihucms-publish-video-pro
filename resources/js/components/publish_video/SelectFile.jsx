import React from "react";
import Popup from "./Popup.jsx";

class SelectFile extends React.PureComponent {
    constructor(props) {
        super(props);
        this.userFileInput = React.createRef();
        this.fileInput = React.createRef();
        this.handleSelectFile = this.handleSelectFile.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.state = {
            visible: true
        };
    }

    // 上传视频
    handleSelectFile() {
        this.props.callback(this.userFileInput.current.files);
        this.handleHidden();
    }

    // 拍摄视频
    handleUploadFile() {
        this.props.callback(this.fileInput.current.files);
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
                <div className="bg-grey">
                    <div className="weui-actionsheet__menu pop-rounded-top overflow-hidden">
                        <div className="weui-actionsheet__cell">
                            <input className="file-input-transparent w-100 h-100 position-absolute"
                                   type="file" onChange={this.handleSelectFile}
                                   ref={this.userFileInput} accept="video/*" capture="user"/>
                            拍摄
                        </div>
                        <div className="weui-actionsheet__cell">
                            <input className="file-input-transparent w-100 h-100 position-absolute"
                                   type="file" onChange={this.handleUploadFile}
                                   ref={this.fileInput} accept="video/*"/>
                            从相册选择
                        </div>
                    </div>
                    <div className="weui-actionsheet__action">
                        <div onClick={this.handleHidden}
                             className="weui-actionsheet__cell weui-actionsheet_cancel close-popup">取消
                        </div>
                    </div>
                </div>
            </Popup>
        );
    }
}

export default SelectFile;