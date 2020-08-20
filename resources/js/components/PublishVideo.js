import React from 'react';
import ReactDOM from 'react-dom';
import GoBack from './publish_video/GoBack.jsx';
import PublishType from './publish_video/PublishType.jsx';
import PublishTypeItem from './publish_video/PublishTypeItem.jsx';
import SelectFile from './publish_video/SelectFile.jsx';
import VideoPreview from './publish_video/VideoPreview.jsx';
import SelectMusic from "./publish_video/SelectMusic.jsx";
import SelectVideo from "./publish_video/SelectVideo.jsx";
import SelectImage from "./publish_video/SelectImage.jsx";
import SelectedImage from "./publish_video/SelectedImage.jsx";
import CourseShow from "./publish_video/CourseShow.jsx";
import CourseList from "./publish_video/CourseList.jsx";
import PublishForm from "./publish_video/PublishForm.jsx";
import SelectTag from "./publish_video/SelectTag.jsx";
import SelectLookAuth from "./publish_video/SelectLookAuth.jsx";
import Loading from "./publish_video/Loading.jsx";

class PublishVideo extends React.PureComponent {
    constructor(props) {
        super(props);
        // 后退
        this.handleGoBack = this.handleGoBack.bind(this);
        // 主界面菜单
        this.handleSelectPublishType = this.handleSelectPublishType.bind(this);
        // 上传视频
        this.handleSelectFile = this.handleSelectFile.bind(this);
        this.closeFilePopup = this.closeFilePopup.bind(this);
        // 选择音乐
        this.handleSelectBackgroundAudioPopup = this.handleSelectBackgroundAudioPopup.bind(this);
        this.closeBackgroundAudioPopup = this.closeBackgroundAudioPopup.bind(this);
        // 选择视频
        this.handleSelectVideo = this.handleSelectVideo.bind(this);
        this.closeVideoPopup = this.closeVideoPopup.bind(this);
        // 切换视图
        this.handleRedirect = this.handleRedirect.bind(this);
        // 设置视频SRC
        this.setVideoSource = this.setVideoSource.bind(this);
        // 上传视频到服务器
        this.handleUploadFile = this.handleUploadFile.bind(this);
        // 上传图片到服务器
        this.handleUploadImage = this.handleUploadImage.bind(this);
        // 上传图片
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.closeImagePopup = this.closeImagePopup.bind(this);
        // 图片列表
        this.handlePushImageItem = this.handlePushImageItem.bind(this);
        this.closePushImageItemPopup = this.closePushImageItemPopup.bind(this);
        this.handleDeleteImageItem = this.handleDeleteImageItem.bind(this);
        // 播放帮助视频
        this.setHelpVideoSrc = this.setHelpVideoSrc.bind(this);
        // 标签选择
        this.setTag = this.setTag.bind(this);
        this.closeSelectTagPopup = this.closeSelectTagPopup.bind(this);
        this.handleSelectTag = this.handleSelectTag.bind(this);
        // 权限选择
        this.setLookAuth = this.setLookAuth.bind(this);
        this.closeSelectLookAuthPopup = this.closeSelectLookAuthPopup.bind(this);
        this.handleSelectLookAuth = this.handleSelectLookAuth.bind(this);
        // 自定义封面
        this.handleSelectCover = this.handleSelectCover.bind(this);
        // 重置表单
        this.resetForm = this.resetForm.bind(this);
        // 设置背景音乐地址
        this.setBackgroundAudioId = this.setBackgroundAudioId.bind(this);
        // 发送处理请求
        this.processRequest = this.processRequest.bind(this);
        // 帮助视频
        this.getHelpVideo = this.getHelpVideo.bind(this);
        // 生成影集
        this.handleMakeVideo = this.handleMakeVideo.bind(this);
        // 生成封面
        this.handleMakeVideoFrame = this.handleMakeVideoFrame.bind(this);

        this.state = {
            loading: false,
            // 选择上传视频资源的窗口显隐状态
            uploadVideoModal: false,
            // 选择上传图片的窗口显隐状态
            uploadPhotoModal: false,
            // 图片列表展示窗口显隐状态
            imageItemsModal: false,
            // 图集图片列表
            images: [],
            // 图集已选择图片列表
            imageItems: [],
            // 选择背景音乐窗口的显隐状态
            backgroundAudioModal: false,
            // 选择同款或合拍视频窗口的显隐状态
            videoModal: false,
            // 选择同款或合拍视频窗口的处理类型（同款：tk、合拍：hp、影集：yj、背景音乐：bg_audio）
            precessType: null,
            // 选择同款或合拍视频的地址
            videoSourceUrl: "",
            // 当前上传视频的预览地址
            videoPreviewUrl: "",
            // 当前已上视频的表单值
            formVideoValue: "",
            // 选择背景音乐的ID
            backgroundAudioId: 0,
            // 标签窗口的显隐状态
            tagModal: false,
            // 标签列表
            tags: [],
            // 当前显示内容
            currentViewNumber: 0,
            // 是否自定义封面图片
            isCustomCover: false,
            // 自定义封面图片
            cover: {src: "", url: ""},
            // 权限选择窗口的显隐状态
            lookAuthModal: false,
            // 权限值
            lookAuth: 0,
            // 帮助
            helpVideoSrc: null,
            helpItems: [],
        };
    }

    // 重置
    resetForm() {
        this.setState({
            // 图集图片列表
            images: [],
            // 图集已选择图片列表
            imageItems: [],
            // 选择同款或合拍视频窗口的类型（同款：tk、合拍：hp、影集：yj、背景音乐：bg_audio）
            precessType: null,
            // 选择同款或合拍视频的地址
            videoSourceUrl: "",
            // 当前上传视频的预览地址
            videoPreviewUrl: "",
            // 当前已上视频的值
            formVideoValue: "",
            // 选择背景音乐的ID
            backgroundAudioId: 0,
            // 标签列表
            tags: [],
            // 当前显示内容
            currentViewNumber: 0,
            // 是否自定义封面图片
            isCustomCover: false,
            // 自定义封面图片
            cover: {src: "", url: ""},
            // 权限值
            lookAuth: 0,
        })
    }

    // 设置当前帮助视频地址
    setHelpVideoSrc(helpVideoSrc) {
        this.setState({helpVideoSrc, currentViewNumber: 4});
    }

    // 上传视频
    handleUploadFile(files) {
        // 运行后将值存放在sessionStorage中
        uploadFileApi(files, "video", "video");
        // 200ms请求查一次数据是否已经存储，最多300次（1分钟）内未查到视为失败
        let count = 0;
        let jsonData = null;
        const interval = setInterval(() => {
            count++;
            jsonData = sessionStorage.getItem("uploadResponse");
            if (jsonData) {
                jsonData = JSON.parse(jsonData);
                this.setState(prevState => ({
                    videoPreviewUrl: jsonData.url,
                    formVideoValue: jsonData.src,
                    currentViewNumber: 1,
                    precessType: prevState.precessType === 'yj' ? null : prevState.precessType
                }));
                sessionStorage.removeItem("uploadResponse");
                if (this.state.videoSourceUrl.length > 0 && (this.state.precessType === "tk" || this.state.precessType === "hp")) {
                    // 请求执行合拍或同款
                    this.processRequest({
                        type: this.state.precessType,
                        source_video: this.state.videoSourceUrl,
                        new_video: jsonData.src
                    })
                        .then(response => {
                            this.setState({
                                formVideoValue: response.data.src,
                                videoPreviewUrl: response.data.url,
                                currentViewNumber: 1
                            });
                        })
                        .catch(error => {
                            console.log(error);
                            alert(error.message);
                        })
                }
            }
            if (count > 300) {
                clearInterval(interval);
            }
        }, 200);
    }

    // 上传图片
    handleUploadImage(files) {
        // 运行后将值存放在sessionStorage中
        uploadFileApi(files, "images", "image");
        // 200ms请求查一次数据是否已经存储，最多300次（1分钟）内未查到视为失败
        let count = 0;
        let jsonData = null;
        const interval = setInterval(() => {
            count++;
            jsonData = sessionStorage.getItem("uploadResponse");
            if (jsonData) {
                jsonData = JSON.parse(jsonData);
                // 是否自定义封面
                if (this.state.isCustomCover === false) {
                    let images = this.state.images;
                    images = [...images, jsonData];
                    this.setState({images, uploadPhotoModal: false, imageItemsModal: true});
                } else {
                    this.setState({cover: jsonData, uploadPhotoModal: false});
                }
                sessionStorage.removeItem("uploadResponse");
            }
            if (count > 300) {
                clearInterval(interval);
            }
        }, 200);
    }

    // 删除图片
    handleDeleteImageItem(index) {
        this.setState(prevState => ({images: prevState.images.filter((item, i) => i !== index)}))
    }

    // 设置选择同款或合拍视频的地址
    setVideoSource(videoSourceUrl) {
        this.setState({videoSourceUrl, currentViewNumber: 1})
    }

    // 后退
    handleGoBack() {
        if (this.state.currentViewNumber < 1) {
            window.history.back();
        } else if (this.state.currentViewNumber === 3) {
            this.handleRedirect(0)
        } else {
            this.handleRedirect(this.state.currentViewNumber - 1)
        }
    }

    // 读取帮助列表
    getHelpVideo() {
        axios.get(this.props.helpVideoApi)
            .then(response => {
                this.setState({helpItems: response.data.data})
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    // 主菜单操作事件调用
    handleSelectPublishType(id) {
        switch (id) {
            case 'tk':
                this.handleSelectVideo("tk");
                break;
            case 'hp':
                this.handleSelectVideo("hp");
                break;
            case 'yj':
                this.handlePushImageItem();
                break;
            case 'cz':
                this.handleSelectFile();
                break;
            default:
                if (this.state.helpItems.length === 0) {
                    this.getHelpVideo()
                }
                this.handleRedirect(3);
        }
    }

    // 显示选择图片上传窗口
    handleSelectImage() {
        this.setState({uploadPhotoModal: true});
    }

    closeImagePopup() {
        this.setState({uploadPhotoModal: false});
    }

    // 显示选择图片列表窗口
    handlePushImageItem() {
        this.setState({imageItemsModal: true, precessType: 'yj'});
    }

    closePushImageItemPopup() {
        this.setState(prevState => ({imageItemsModal: false, precessType: prevState.images.length < 1 ? null : "yj"}));
    }

    // 显示选择标签列表窗口
    handleSelectTag() {
        this.setState({tagModal: true});
    }

    closeSelectTagPopup() {
        this.setState({tagModal: false});
    }

    setTag(tags) {
        this.setState({tags});
    }

    // 显示选择标签列表窗口
    handleSelectLookAuth() {
        this.setState({lookAuthModal: true});
    }

    closeSelectLookAuthPopup() {
        this.setState({lookAuthModal: false});
    }

    setLookAuth(lookAuth) {
        this.setState({lookAuth});
    }

    // 显示选择视频上传窗口
    handleSelectFile() {
        this.setState({uploadVideoModal: true});
    }

    closeFilePopup() {
        this.setState({uploadVideoModal: false});
    }

    // 显示选择背景音乐选择窗口
    handleSelectBackgroundAudioPopup() {
        this.setState({backgroundAudioModal: true});
    }

    closeBackgroundAudioPopup() {
        this.setState({backgroundAudioModal: false});
    }

    setBackgroundAudioId(backgroundAudioId) {
        this.setState({backgroundAudioId});
        // 如果已经上传视频，设置背景音乐后开始合成音乐
        if (this.state.videoPreviewUrl.length > 0) {
            this.processRequest({
                type: 'bg_audio',
                video: this.state.formVideoValue,
                audio: backgroundAudioId
            })
                .then(response => {
                    this.setState({
                        videoPreviewUrl: response.data.url,
                        formVideoValue: response.data.src,
                        precessType: 'bg_audio',
                        currentViewNumber: 1
                    });
                })
                .catch(error => {
                    console.log(error);
                    alert(error.message)
                })
        } else {
            // 如果已选择图片弹出影集操作窗口
            if (this.state.images.length > 0 && this.state.precessType === 'yj') {
                this.setState({imageItemsModal: true});
            }
        }
    }

    // 显示选择同款或合拍的视频选择窗口
    handleSelectVideo(precessType) {
        this.setState({videoModal: true, precessType});
    }

    closeVideoPopup() {
        this.setState({videoModal: false});
    }

    // 生成封面
    handleMakeVideoFrame() {
        this.processRequest({
            type: "frame",
            video: this.state.formVideoValue
        })
            .then(response => {
                this.setState({currentViewNumber: 2, cover: response.data})
            })
            .catch(error => {
                console.log(error);
                alert(error.message)
            })
    }

    // 生成影集
    handleMakeVideo() {
        if (this.state.images.length < 1) {
            alert("还没有添加图片哟 ~^o^~");
            this.handleSelectImage();
            return false;
        }
        if (this.state.backgroundAudioId < 1) {
            alert("没有音乐的影集是没有灵魂的影集喔 =^_^=");
            this.handleSelectBackgroundAudioPopup();
            return false;
        }
        this.processRequest({
            type: 'image_video',
            images: this.state.images,
            audio: this.state.backgroundAudioId
        })
            .then(response => {
                this.setState({
                    videoPreviewUrl: response.data.url,
                    formVideoValue: response.data.src,
                    precessType: 'yj',
                    currentViewNumber: 1
                });
            })
            .catch(error => {
                console.log(error);
                alert(error.message)
            })
    }

    // 发送处理请求
    processRequest(options) {
        this.setState({loading: true});
        return axios.post(this.props.processApi, options)
            .then(response => {
                this.setState({loading: false});
                return response.data;
            })
            .catch(error => {
                this.setState({loading: false});
                return error.response.data;
            })
    }

    // 视图切换
    handleRedirect(val) {
        if (val === 0) {
            // 返回主界面时清空值
            this.setState({
                currentViewNumber: val,
                backgroundAudioId: 0,
                videoPreviewUrl: "",
                videoSourceUrl: "",
                formVideoValue: "",
                precessType: null
            });
        } else {
            this.setState({currentViewNumber: val});
        }
    }

    handleSelectCover() {
        this.setState({isCustomCover: true});
        this.handleSelectImage()
    }

    // 根据当前显示内容ID渲染不同视图
    currentContent() {
        switch (this.state.currentViewNumber) {
            case 0:
                // 菜单选择页
                return <PublishType>
                    {
                        (this.props.publishTypeList || []).map(item => (
                            <PublishTypeItem key={item.id} {...item} callback={this.handleSelectPublishType}/>
                        ))
                    }
                </PublishType>;
            case 1:
                // 预览页
                return <VideoPreview videoSourceUrl={this.state.videoSourceUrl}
                                     videoPreviewUrl={this.state.videoPreviewUrl}
                                     precessType={this.state.precessType}
                                     selectImage={this.handlePushImageItem}
                                     selectFile={this.handleSelectFile}
                                     selectBackgroundAudio={this.handleSelectBackgroundAudioPopup}
                                     selectVideo={this.handleSelectVideo}
                                     redirectPusblish={this.handleMakeVideoFrame}
                />;
            case 2:
                // 发布页
                return (
                    <PublishForm src={this.state.formVideoValue} cover={this.state.cover} tags={this.state.tags}
                                 lookAuth={this.state.lookAuth} publishUrl={this.props.publishUrl}
                                 selectLookAuth={this.handleSelectLookAuth} selectTag={this.handleSelectTag}
                                 selectCover={this.handleSelectCover} resetForm={this.resetForm}/>
                );
            case 3:
                // 帮助中心列表
                return <CourseList items={this.state.helpItems} callback={this.setHelpVideoSrc}/>;
            case 4:
                // 帮助中心详细
                return <CourseShow src={this.state.helpVideoSrc}/>;
        }
    }

    render() {
        console.log(this.state);
        return (
            <>
                <GoBack goBack={this.handleGoBack}/>
                {
                    this.currentContent()
                }
                {
                    this.state.loading && <Loading/>
                }
                {
                    this.state.uploadVideoModal && (
                        <SelectFile onClose={this.closeFilePopup} callback={this.handleUploadFile}/>
                    )
                }
                {
                    this.state.uploadPhotoModal && (
                        <SelectImage onClose={this.closeImagePopup} callback={this.handleUploadImage}/>
                    )
                }
                {
                    this.state.imageItemsModal && (
                        <SelectedImage images={this.state.images} imageItems={this.state.imageItems}
                                       onUpload={this.handleSelectImage} onClose={this.closePushImageItemPopup}
                                       deleteImage={this.handleDeleteImageItem}
                                       selectBgAudio={this.handleSelectBackgroundAudioPopup}
                                       handleMakeVideo={this.handleMakeVideo}/>
                    )
                }
                {
                    this.state.backgroundAudioModal && (
                        <SelectMusic onClose={this.closeBackgroundAudioPopup} apiUrl={this.props.audioApi}
                                     callback={this.setBackgroundAudioId}/>
                    )
                }
                {
                    this.state.videoModal && (
                        <SelectVideo type={this.state.precessType} apiUrl={this.props.shortVideoApi}
                                     onClose={this.closeVideoPopup} callback={this.setVideoSource}/>
                    )
                }
                {
                    this.state.tagModal && (
                        <SelectTag tags={this.state.tags} apiUrl={this.props.tagApi}
                                   onClose={this.closeSelectTagPopup} callback={this.setTag}/>
                    )
                }
                {
                    this.state.lookAuthModal && (
                        <SelectLookAuth lookAuth={this.state.lookAuth} callback={this.setLookAuth}
                                        onClose={this.closeSelectLookAuthPopup}/>
                    )
                }
            </>
        );
    }
}

export default PublishVideo;

const root = document.getElementById('PublishVideo');
if (root && typeof publishOptions !== "undefined") {
    ReactDOM.render(<PublishVideo {...publishOptions}/>, root);
}