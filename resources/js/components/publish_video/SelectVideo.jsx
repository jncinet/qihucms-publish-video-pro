import React from "react";
import Popup from "./Popup.jsx";
import LocalVideo from "./LocalVideo.jsx";
import SelectVideoItem from "./SelectVideoItem.jsx";
import SelectModalTop from "./SelectModalTop.jsx";

class SelectVideo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectVideo = this.handleSelectVideo.bind(this);
        this.getItems = this.getItems.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            visible: true,
            keyword: "",
            loading: false,
            items: [],
            meta: {
                current_page: 0,
                last_page: 1,
                total: 1
            }
        };
    }

    handleScroll(event) {
        if (event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop <= 168) {
            this.getItems();
        }
    }

    getItems() {
        const {meta, keyword, loading} = this.state;
        if (keyword.length < 1 || meta.last_page <= meta.current_page || loading) {
            return false;
        }
        const page = meta.current_page + 1;
        this.setState({loading: true});
        axios.get(this.props.apiUrl, {params: {keyword, page}})
            .then(response => {
                this.setState(prevState => ({
                    loading: false,
                    items: [...prevState.items, ...response.data.data],
                    meta: {
                        current_page: response.data.meta.current_page,
                        last_page: response.data.meta.last_page,
                        total: response.data.meta.total
                    }
                }))
            })
            .catch(error => {
                this.setState({loading: false});
                alert("读取失败");
                console.log(error.response.data);
            });
    }

    // 隐藏窗口
    handleHidden() {
        this.setState({visible: false, keyword: ""});
        setTimeout(() => {
            this.props.onClose();
        }, 300);
    }

    // 输入关键词
    handleSearch(keyword) {
        this.setState(prevState => ({
            keyword,
            items: prevState.keyword !== keyword ? [] : prevState.items,
            meta: prevState.keyword !== keyword ? {
                current_page: 0,
                last_page: 1,
                total: 1
            } : prevState.meta
        }));
        this.getItems();
    }

    // 选择设置后关闭窗口
    handleSelectVideo(src) {
        this.props.callback(src);
        this.handleHidden();
    }

    render() {
        const btnText = {tk: "拍同款", hp: "合拍"};
        return (
            <Popup visible={this.state.visible} onClose={this.handleHidden}>
                <div className="pop-rounded-top px-2 pt-2 pb-1 bg-white">
                    <SelectModalTop placeholder="输入视频标签查询" onSearch={this.handleSearch}
                                    onClose={this.handleHidden}>选择视频</SelectModalTop>
                    {
                        this.state.keyword.length === 0 ? (
                            <LocalVideo btnText={btnText[this.props.type]} callback={this.handleSelectVideo}/>
                        ) : (
                            <div className="pl-2 pb-1 d-flex flex-wrap align-items-stretch"
                                 style={{maxHeight: "66vh", overflowY: "auto"}} onScroll={this.handleScroll}>
                                {
                                    (this.state.items || []).map(item => (
                                        <SelectVideoItem key={item.id} src={item.src} poster={item.cover}
                                                         btnText={btnText[this.props.type]}
                                                         callback={this.handleSelectVideo}/>
                                    ))
                                }
                                {
                                    this.state.meta.last_page === this.state.meta.current_page && (
                                        <div className="w-100 text-secondary font-size-14 py-2 text-center">没有更多了</div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </Popup>
        );
    }
}

export default SelectVideo;