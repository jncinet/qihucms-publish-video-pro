import React from "react";
import Popup from "./Popup.jsx";
import SelectMusicItem from "./SelectMusicItem.jsx";
import SelectModalTop from "./SelectModalTop.jsx";

class SelectMusic extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleHidden = this.handleHidden.bind(this);
        this.setBackgroundAudio = this.setBackgroundAudio.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.getItems = this.getItems.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            visible: true,
            loading: false,
            keyword: "",
            playingAudioId: 0,
            items: [],
            meta: {
                current_page: 0,
                last_page: 1,
                total: 1
            }
        };
    }

    componentDidMount() {
        this.getItems();
    }

    handleScroll(event) {
        if (event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop <= 168) {
            this.getItems();
        }
    }

    getItems() {
        const {meta, keyword, loading} = this.state;
        if (meta.last_page <= meta.current_page || loading) {
            return false;
        }
        const page = meta.current_page + 1;
        this.setState({loading: true});
        axios.get(this.props.apiUrl, {params: {keyword, page, limit: 15}})
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

    setBackgroundAudio(playingAudioId) {
        this.props.callback(playingAudioId);
        this.setState({playingAudioId: 0});
        this.handleHidden();
    }

    handlePlay(playingAudioId) {
        this.setState(prevState => ({playingAudioId: prevState.playingAudioId === playingAudioId ? 0 : playingAudioId}));
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
                    <SelectModalTop placeholder="输入音乐名称查询" onSearch={this.handleSearch}
                                    onClose={this.handleHidden}>选择音乐</SelectModalTop>
                    <div className="px-2 pb-1" style={{maxHeight: "66vh", overflowY: "auto"}}
                         onScroll={this.handleScroll}>
                        {
                            (this.state.items || []).map(item => (
                                <SelectMusicItem key={item.id} playing={item.id === this.state.playingAudioId}
                                                 title={item.title} url={item.url} id={item.id} cover={item.cover}
                                                 onPlay={this.handlePlay} onCallback={this.setBackgroundAudio}/>
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

export default SelectMusic;