@extends('layouts.wap_no_header')

@section('title', '发布作品')

@section('styles')
    <style type="text/css">
        body {
            background: #000;
        }

        .go-back {
            position: fixed;
            left: .6rem;
            top: .6rem;
            z-index: 9;
            line-height: 2rem;
            height: 2rem;
            width: 2rem;
            text-align: center;
        }

        .absolute-right-center {
            right: 1rem;
            top: 50%;
            z-index: 9;
            transform: translateY(-50%);
        }

        .absolute-top-right {
            right: 1rem;
            top: 1rem;
            z-index: 9;
        }

        .delete-image {
            width: 24px;
            height: 24px;
            right: 12px;
            top: 12px;
            z-index: 9;
        }

        .delete-image-select {
            border: 2px solid rgba(255, 255, 255, .7);
            background: rgba(0, 0, 0, .5);
            text-align: center;
            line-height: 18px;
        }

        .publish-type-item {
            width: 43px;
            height: 51px;
            opacity: .5
        }

        .bg-grey {
            background: rgb(239, 239, 244);
        }

        .select-video-input {
            height: 3.125rem;
        }

        .videoSelectWrap {
            transform: translate(0, 0);
            transition: all 1s
        }

        .showUploading {
            transform: translate(0, -95px);
        }

        .video-uploading {
            height: 0;
            overflow: hidden;
            transition: all 1s
        }

        .showUploading > div.video-uploading {
            height: 64px;
            transform: translate(0, 0);
        }

        .showVideoView {
            transform: translate(0, -159px);
        }

        .video-view {
            height: 0;
            overflow: hidden;
            transition: all 1s
        }

        .showVideoView > div.video-view {
            height: 266px;
        }

        .absolute-bottom {
            left: 0;
            bottom: 0;
            z-index: 9;
        }

        .absolute-center {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 9;
        }

        .pop-rounded-top {
            border-radius: .6rem .6rem 0 0;
        }

        .search-input {
            background: #efeff4;
        }

        /*placeholder字体颜色*/
        .search-input::-webkit-input-placeholder { /* WebKit browsers */
            color: #ccc;
            font-size: 14px;
        }

        .search-input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #ccc;
        }

        .search-input::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #ccc;
            opacity: 1;
        }

        .search-input:-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #ccc !important;
        }

        .w-33 {
            width: 33.3333%;
        }

        .vh-26 {
            height: 26vh;
        }

        .select-video-item {
            width: 33.3333%;
            height: 26vh;
            padding: 0 2px;
            margin-bottom: 4px;
        }

        .select-video-item > div {

        }

        .sm-circle-ico {
            width: 36px;
            height: 36px;
            border-radius: 9px;
            border: 1px solid rgba(255, 255, 255, .6);
            background: rgba(0, 0, 0, .1);
        }

        .lg-circle-wrap {
            border: 6px solid rgba(233, 67, 89, .6);
            width: 66px;
            height: 66px;
        }

        .lg-circle-ico {
            background: rgb(233, 67, 89);
            width: 52px;
            height: 52px;
        }

        .audio_soundbyte {
            height: 55px;
            background: url('{{ asset('asset/soundbyte.png') }}') repeat-x;
        }

        .selected-tag-items > div {
            line-height: 1.8rem;
            border-radius: .9rem;
            border: 1px solid rgba(69, 69, 80, .4);
            background: rgba(69, 69, 80, .1);
        }

        .selected-tag-items > div > div:first-child {
            max-width: 100px;
        }
    </style>
    <script>
        var publishOptions = {
            userId: {{ Auth::id() }},
            publishTypeList: [
                {
                    id: "cz",
                    title: "创建视频",
                    img: {src: "{{ asset('vendor/publish-video/cz.png') }}", height: 35, alt: "创建作品"}
                },
                {
                    id: "yj",
                    title: "制作影集",
                    img: {src: "{{ asset('vendor/publish-video/yj.png') }}", height: 32, alt: "创建作品"}
                },
                {
                    id: "tk",
                    title: "拍摄同款",
                    img: {src: "{{ asset('vendor/publish-video/tk.png') }}", height: 35, alt: "拍摄同款"}
                },
                {
                    id: "hp",
                    title: "合拍视频",
                    img: {src: "{{ asset('vendor/publish-video/hp.png') }}", height: 42, alt: "合拍视频"}
                },
                {
                    id: "zs",
                    title: "创作助手",
                    img: {src: "{{ asset('vendor/publish-video/zs.png') }}", height: 30, alt: "合拍视频"}
                }
            ],
            audioApi: "{{ route('publish-video-pro.api.background-audio.index') }}",
            tagApi: "{{ route('publish-video-pro.api.tags.index') }}",
            publishUrl: "{{ route('publish-video-pro.store') }}",
            processApi: "{{ route('publish-video-pro.process') }}",
            helpVideoApi: "{{ route('publish-video-pro.api.help-video.index') }}",
            shortVideoApi: "{{ route('publish-video-pro.api.short-video.index') }}",
        };
    </script>
@endsection

@section('content')
    @if(cache('config_publish_video_auth') != 'all' && Auth::user()['vip_rank'] < 1)
        <div class="p-3">
            <div class="alert alert-warning" role="alert">
                对不起，只有VIP会员才可以发布视频；
                <hr>
                <a href="{{ route('vip') }}" class="btn btn-block btn-warning">成为VIP会员</a>
            </div>
        </div>
    @else
        <div id="PublishVideo" class="vw-100 vh-100"></div>
    @endif
@endsection

@push('scripts')
    <script src="{{ asset('js/upload.js') }}"></script>
    <script>
        @if(session('result'))
        $.toast("{{ session('result') }}", "text");
        @endif

        // 上传文件接口，在react中调用
        function uploadFileApi(files, path, type) {
            @switch(config('filesystems.default'))
            @case('qiniu')
            $.qn({
                path: path + "/{{ Auth::id() }}",
                file: files[0],
                tokenUrl: "{{ route('upload.qiniu.token') }}",
                success: function (res) {
                    var jsonData = {src: res.key, url: "{{ config('filesystems.disks.qiniu.domain') }}/" + res.key};
                    sessionStorage.setItem("uploadResponse", JSON.stringify(jsonData));
                },
                fail: function () {
                    $.toast("上传失败", "cancel");
                }
            });
            @break
            @case('oss')
            $.oss({
                path: path + "/{{ Auth::id() }}",
                file: files[0],
                accessKeyId: "{{ config('filesystems.disks.oss.access_key') }}",
                accessKeySecret: "{{ config('filesystems.disks.oss.secret_key') }}",
                bucket: "{{ config('filesystems.disks.oss.bucket') }}",
                endpoint: "{{ config('filesystems.disks.oss.endpoint') }}",
                cname: {{ config('filesystems.disks.oss.isCName') }},
                success: function (res) {
                    var jsonData = {src: res.name, url: res.url};
                    sessionStorage.setItem("uploadResponse", JSON.stringify(jsonData));
                },
                fail: function () {
                    $.toast("上传失败", "cancel");
                }
            });
            @break
            @default

            $.bd({
                path: path + "/{{ Auth::id() }}",
                input: type,
                file: files[0],
                uploadUrl: "{{ route('upload') }}",
                success: function (res) {
                    var jsonData = {src: res.data.name, url: res.data.url};
                    sessionStorage.setItem("uploadResponse", JSON.stringify(jsonData));
                },
                fail: function () {
                    $.toast("上传失败", "cancel");
                }
            });
            @endswitch
        }

        // app中获取定位
        function receiveAppLocation(data) {
            // 城市：data.city,
            // 省份：data.province
            var jsonData = {
                province: data.province,
                city: data.city
            };
            sessionStorage.setItem("userAddress", JSON.stringify(jsonData));
        }

        // 获取定位数据
        wx.config( {!! $weChatJsSdk !!} );
        var weChatGps = undefined;
        wx.ready(function () {
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    axios.get("{{ route('publish-video-pro.location') }}", {
                        params: {
                            type: 'gps',
                            latitude: res.latitude,
                            longitude: res.longitude
                        }
                    })
                        .then(function (response) {
                            if (response.data.status === 0) {
                                var jsonData = {
                                    province: response.data.result.address_component.province,
                                    city: response.data.result.address_component.city
                                };
                                sessionStorage.setItem("userAddress", JSON.stringify(jsonData));
                                weChatGps = true;
                            }
                        })
                        .catch(function (error) {
                        });
                }
            });
        });
        if (weChatGps !== true) {
            setTimeout(function () {
                if (window.Qihu) {
                    window.Qihu.location('receiveAppLocation');
                } else {
                    axios.get("{{ route('publish-video-pro.location') }}", {
                        params: {
                            type: 'ip'
                        }
                    })
                        .then(function (res) {
                            if (res.data.status === 0) {
                                var jsonData = {
                                    province: res.data.result.ad_info.province,
                                    city: res.data.result.ad_info.city
                                };
                                sessionStorage.setItem("userAddress", JSON.stringify(jsonData));
                            }
                        })
                        .catch(function (err) {
                            console.log(err.response);
                        });
                }
            }, 1000);
        }
    </script>
@endpush