<?php

namespace Qihucms\PublishVideoPro\Controllers\Wap;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Qihucms\PublishVideoPro\Requests\ShortVideoRequest;
use App\Models\ShortVideo;
use App\Services\WechatService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Qihucms\TencentLbs\TencentLbs;

class VideoController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $weChatJsSdk = (new WechatService())->jssdk();
        return view('publishVideoPro::wap.create', compact('weChatJsSdk'));
    }

    /**
     * @param ShortVideoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ShortVideoRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::id();
        if ($data['version'] == 2) {
            // 新发布接口
            $data['status'] = Cache::get('config_check_short_video', 0);
            unset($data['version']);
            $data['exif'] = app('videoFFMpeg')->avInfo(Storage::url($data['src']));
            $result = ShortVideo::create($data);
            if ($result) {
                return $this->successJson('发布成功', $result);
            }
        }
        return $this->errorJson('发布失败');
    }

    /**
     * @param Request $request
     * @return array|\Illuminate\Http\JsonResponse|mixed
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function location(Request $request)
    {
        $type = $request->get('type', 'ip');
        $lbs = new TencentLbs();
        if ('ip' == $type) {
            $data = $lbs->ipLocation($request->ip());
        } elseif ('gps' == $type) {
            $data = $lbs->gpsLocation($request->get('latitude'), $request->get('longitude'));
        } elseif ('app_lbs' == $type) {
            $data = [
                'result' => [
                    'ad_info' => [
                        'province' => $request->get('province'),
                        'city' => $request->get('city'),
                        'district' => $request->get('district')
                    ]
                ]
            ];
        } else {
            return response()->json(['msg' => '参数错误'], 422);
        }
        if ($request->get('is_session')) {
            session([
                'ad_info' => [
                    'province' => $data['result']['ad_info']['province'],
                    'city' => $data['result']['ad_info']['city'],
                    'district' => $data['result']['ad_info']['district']
                ]
            ]);
        }
        return $data;
    }
}