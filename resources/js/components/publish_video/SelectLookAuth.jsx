import React from "react";
import Popup from "./Popup.jsx";

class SelectLookAuth extends React.Component {
    constructor(props) {
        super(props);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            visible: true
        }
    }

    handleSelect(val) {
        this.handleHidden();
        this.props.callback(val);
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
                <div className="pop-rounded-top p-2 bg-white">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <div onClick={this.handleHidden}
                             className="font-size-22 line-height-1 text-center"
                             style={{width: "1.375rem"}} aria-hidden="true">
                            &times;
                        </div>
                        <div style={{paddingTop: 2}}>谁可以看</div>
                        <div style={{width: "1rem", height: "1rem"}}/>
                    </div>
                    <div onClick={() => this.handleSelect(0)}
                         className="d-flex px-2 justify-content-between align-items-center py-2 qh-border-bottom">
                        <div>
                            <div className="text-333 pb-1">公开</div>
                            <div className="text-999 font-size-14">所有人可见</div>
                        </div>
                        {
                            this.props.lookAuth === 0 &&
                            <i className="iconfont icon-xuanzhong text-primary" aria-hidden={true}/>
                        }
                    </div>
                    <div onClick={() => this.handleSelect(1)}
                         className="d-flex px-2 justify-content-between align-items-center py-2 qh-border-bottom">
                        <div>
                            <div className="text-333 pb-1">VIP观看</div>
                            <div className="text-999 font-size-14">开通VIP的用户才能观看</div>
                        </div>
                        {
                            this.props.lookAuth === 1 &&
                            <i className="iconfont icon-xuanzhong text-primary" aria-hidden={true}/>
                        }
                    </div>
                </div>
            </Popup>
        );
    }
}

export default SelectLookAuth;