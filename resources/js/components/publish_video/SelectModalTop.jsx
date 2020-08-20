import React from "react";

class SelectModalTop extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            keyword: "",
            oldKeyword: ""
        }
    }

    // 输入内容后1秒执行搜索
    handleChange(event) {
        const keyword = event.target.value;
        this.setState(
            prevState => ({
                keyword,
                oldKeyword: prevState.keyword
            })
        );
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
            if (this.state.keyword.length > 0 && this.state.keyword !== this.state.oldKeyword) {
                this.props.onSearch(this.state.keyword);
            }
        }, 999);
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <div onClick={() => this.props.onClose()}
                         className="font-size-22 line-height-1 text-center"
                         style={{width: "1.375rem"}} aria-hidden="true">
                        &times;
                    </div>
                    <div style={{paddingTop: 2}}>{this.props.children}</div>
                    <div style={{width: "1rem", height: "1rem"}}/>
                </div>
                <div className="p-2">
                    <input className="rounded border-0 search-input w-100 px-2 py-1" type="text"
                           placeholder={this.props.placeholder} value={this.state.keyword}
                           onChange={this.handleChange}/>
                </div>
            </div>
        );
    }
}

export default SelectModalTop;