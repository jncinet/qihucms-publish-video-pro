import React from "react";

class PublishForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocusContent = this.handleFocusContent.bind(this);
        this.handleBlurContent = this.handleBlurContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            content: "填写合适作品介绍，让大家更懂你的作品～",
            userAddress: "定位中",
        }
    }

    componentDidMount() {
        // 200ms请求查一次数据是否已经存储，最多50次（5秒）内未查到视为失败
        let count = 0;
        let jsonData = null;
        this.runInterval = setInterval(() => {
            count++;
            jsonData = sessionStorage.getItem("userAddress");
            if (count > 50 || jsonData) {
                jsonData = JSON.parse(jsonData);
                this.setState({userAddress: jsonData ? jsonData : "定位失败"});
                clearInterval(this.runInterval);
            }
        }, 200);
    }

    componentWillUnmount() {
        clearInterval(this.runInterval);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value})
    }

    handleFocusContent(event) {
        if (event.target.value === "填写合适作品介绍，让大家更懂你的作品～") {
            this.setState({content: ""})
        }
    }

    handleBlurContent(event) {
        window.scrollTo(0, 0);
        if (event.target.value === "") {
            this.setState({content: "填写合适作品介绍，让大家更懂你的作品～"})
        }
    }

    handleSubmit() {
        const {content: desc, userAddress} = this.state;
        const {cover, src, lookAuth: price, tags} = this.props;

        if (!cover.hasOwnProperty("src") || cover.src.length < 1) {
            $.alert("请选择封面");
            return;
        }

        if (src.length < 1) {
            $.alert("作品不存在");
            return;
        }

        axios.post(this.props.publishUrl, {
            desc,
            cover: cover.src,
            src,
            tags: tags.join(","),
            city: userAddress.city,
            price,
            version: 2
        })
            .then(() => {
                $.toast('发布成功', () => {
                    this.props.resetForm();
                });
            })
            .catch(error => {
                if (error.response) {
                    const errs = error.response.data.errors;
                    const arrErrs = [];
                    for (let i in errs) {
                        arrErrs.push(errs[i].join('，'));
                    }
                    $.alert(arrErrs.join('<br/>'));
                    return;
                }
                console.log('发布失败', error);
            });
    }

    render() {
        return (
            <div className="text-white vh-100 position-relative">
                <div className="text-center py-3">发布</div>
                <div className="d-flex px-3">
                    <textarea onFocus={this.handleFocusContent} onBlur={this.handleBlurContent}
                              onChange={this.handleChange} value={this.state.content} name="content"
                              className="flex-grow-1 font-size-14 mr-2 bg-transparent search-input border-0 text-999"/>
                    <div style={{height: 126}} onClick={() => this.props.selectCover()}
                         className="w-25 position-relative rounded overflow-hidden d-flex justify-content-center align-items-center">
                        <div
                            className="bg-black-30 w-100 text-truncate py-1 font-size-14 position-absolute absolute-bottom text-center">选封面
                        </div>
                        <img className="d-block w-100" src={this.props.cover.url} alt="封面"/>
                    </div>
                </div>
                <div className="px-3 pt-2">
                    <div onClick={this.props.selectTag}
                         className="d-flex py-2 px-1 my-1 align-items-center qh-border-bottom qh-border-color-grey">
                        <i className="iconfont icon-huati mr-2" aria-hidden={true}/>
                        <div className="text-ccc">标签</div>
                        <div className="ml-auto text-999 text-truncate w-50 text-right">
                            {
                                (this.props.tags || []).length > 0
                                    ? (this.props.tags || []).map(item => <span className="mr-1"
                                                                                key={item}>#{item}</span>)
                                    : "点击设置标签"
                            }
                        </div>
                        <i className="iconfont icon-gengduo1 text-999" aria-hidden={true}/>
                    </div>
                    <div
                        className="d-flex py-2 px-1 my-1 align-items-center qh-border-bottom qh-border-color-grey">
                        <i className="iconfont icon-location mr-2" aria-hidden={true}/>
                        <div className="text-ccc">位置</div>
                        <div
                            className="ml-auto text-999 text-truncate w-50 text-right">
                            {this.state.userAddress.hasOwnProperty('city') ? this.state.userAddress.city : this.state.userAddress}
                        </div>
                    </div>
                    <div onClick={() => this.props.selectLookAuth()}
                         className="d-flex py-2 px-1 my-1 align-items-center qh-border-bottom qh-border-color-grey">
                        <i className="iconfont icon-mima mr-2" aria-hidden={true}/>
                        <div className="text-ccc">权限</div>
                        <div className="ml-auto text-999">{this.props.lookAuth === 0 ? "公开" : "VIP观看"}</div>
                        <i className="iconfont icon-gengduo1 text-999" aria-hidden={true}/>
                    </div>
                </div>
                <div className="w-100 position-absolute absolute-bottom">
                    <div className="p-3">
                        <div className="text-666 font-size-12 py-2">请遵守互联网有关管理规定，禁止发布有关政治、色情、反动等违规内容。</div>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-block">发布</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublishForm;