import React from "react";
import Popup from "./Popup.jsx";
import SelectModalTop from "./SelectModalTop.jsx";

class SelectTag extends React.Component {
    constructor(props) {
        super(props);
        this.handleHidden = this.handleHidden.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.getItems = this.getItems.bind(this);
        this.setSelectedItems = this.setSelectedItems.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            visible: true,
            loading: false,
            keyword: "",
            items: [],
            meta: {
                current_page: 0,
                last_page: 1,
                total: 1
            }
        }
    }

    componentDidMount() {
        this.getItems()
    }

    handleScroll(event) {
        if (event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop <= 168) {
            this.getItems();
        }
    }

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

    getItems() {
        const {meta, keyword, loading} = this.state;
        if (meta.last_page <= meta.current_page || loading) {
            return false;
        }
        const page = meta.current_page + 1;
        this.setState({loading: true});
        axios.get(this.props.apiUrl, {params: {keyword, page, limit: 10}})
            .then(response => {
                if (response.data.data.length > 0) {
                    this.setState(prevState => ({
                        loading: false,
                        items: [...prevState.items, ...response.data.data],
                        meta: {
                            current_page: response.data.meta.current_page,
                            last_page: response.data.meta.last_page,
                            total: response.data.meta.total
                        }
                    }))
                } else {
                    this.setSelectedItems(this.state.keyword);
                }
            })
            .catch(error => {
                this.setState({loading: false});
                alert("读取失败");
                console.log(error.response.data);
            });
    }

    setSelectedItems(val) {
        let selectedItems = this.props.tags;
        if (selectedItems.indexOf(val) === -1) {
            if (selectedItems.length > 4) {
                alert("最多只有添加5个标签");
                return false;
            }
            selectedItems = [...selectedItems, val];
        } else {
            selectedItems = selectedItems.filter(item => item !== val);
        }
        this.props.callback(selectedItems);
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
                    <SelectModalTop placeholder="输入内容标签" onSearch={this.handleSearch}
                                    onClose={this.handleHidden}>添加标签</SelectModalTop>
                    {
                        (this.props.tags || []).length > 0 && (
                            <div className="d-flex flex-wrap selected-tag-items p-1">
                                {
                                    (this.props.tags || []).map(item => (
                                        <div key={item} onClick={() => this.setSelectedItems(item)}
                                             className="d-flex mx-1 mb-1 align-items-center">
                                            <div
                                                className="text-truncate pl-3 pr-2 font-size-14 text-secondary">{item}</div>
                                            <div className="pr-3">&times;</div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                    <div className="px-2" style={{maxHeight: "46vh", overflowY: "auto"}} onScroll={this.handleScroll}>
                        {
                            (this.state.items || []).map(item => (
                                <div key={item.id} onClick={() => this.setSelectedItems(item.word)}
                                     className="d-flex justify-content-between align-items-center py-2 qh-border-bottom">
                                    <div className="text-truncate w-50 text-secondary"># {item.word}</div>
                                    <div className="text-999 font-size-14">{item.count}次搜索</div>
                                </div>
                            ))
                        }
                        {
                            this.state.meta.last_page === this.state.meta.current_page && (
                                <div className="w-100 text-secondary font-size-14 py-2 text-center">没有更多了</div>
                            )
                        }
                    </div>
                </div>
            </Popup>
        );
    }
}

export default SelectTag;