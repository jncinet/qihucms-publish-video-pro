import React from "react";
import Popup from "./Popup.jsx";

class SelectImage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.userImageInput = React.createRef();
        this.imageInput = React.createRef();
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleHidden = this.handleHidden.bind(this);
        this.state = {
            visible: true
        };
    }

    // 拍照
    handleSelectImage() {
        this.props.callback(this.imageInput.current.files);
    }

    // 上传图片
    handleUploadImage() {
        this.props.callback(this.userImageInput.current.files);
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
                                   type="file" onChange={this.handleSelectImage}
                                   ref={this.imageInput} accept="image/*" capture="user"/>
                            拍照
                        </div>
                        <div className="weui-actionsheet__cell">
                            <input className="file-input-transparent w-100 h-100 position-absolute"
                                   type="file" onChange={this.handleUploadImage}
                                   ref={this.userImageInput} accept="image/*"/>
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

export default SelectImage;