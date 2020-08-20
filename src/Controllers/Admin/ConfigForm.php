<?php

namespace Qihucms\PublishVideoPro\Controllers\Admin;

use App\Plugins\Plugin;
use Encore\Admin\Widgets\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ConfigForm extends Form
{
    /**
     * The form title.
     *
     * @var string
     */
    public $title = '发布设置';

    public function handle(Request $request)
    {
        $data = $request->all();

        $message = '保存成功';

        $plugin = new Plugin();

        // 授权激活
        if ($request->has('publish-video-proLicenseKey') && Cache::store('file')->get('publish-video-proLicenseKey') != $data['publish-video-proLicenseKey']) {
            $result = $plugin->registerPlugin('publish-video', $data['publish-videoLicenseKey']);
            if ($result) {
                $message .= '；授权激活成功';
            } else {
                $message .= '；授权激活失败';
            }
        }

        unset($data['publish-videoLicenseKey']);

        foreach ($data as $key => $value) {
            if ($request->hasFile($key)) {
                // 删除原文件
                if (Cache::get($key) && Storage::exists(Cache::get($key))) {
                    Storage::delete(Cache::get($key));
                }
                $file = $request->file($key);
                Cache::put($key, Storage::putFile('config/publish-video', $file));
            } else {
                Cache::put($key, $value);
            }
        }

        admin_success($message);

        return back();
    }

    /**
     * Build a form here.
     */
    public function form()
    {
        $this->divider('授权');
        $this->text('publish-video-proLicenseKey', '插件授权')
            ->help('购买授权地址：<a href="http://ka.qihucms.com/product/" target="_blank">http://ka.qihucms.com</a>');
        $this->number('ffmpeg_video_width', '视频宽度')->help('转码统一的视频宽度，');
        $this->number('ffmpeg_video_height', '视频高度')->help('转码统一的视频高度');
        $this->number('ffmpeg_input_duration', '视频时长限制')
            ->help('限制视频发布时长，超出部份会被删除，为0时不限制，单位：秒，如果要动态修改，可以通过类的setInputDuration(15)方法修改');
    }

    public function data()
    {
        return [
            'publish-video-proLicenseKey' => Cache::store('file')->get('publish-video-proLicenseKey'),
            'ffmpeg_video_width' => Cache::get('ffmpeg_video_width', 544),
            'ffmpeg_video_height' => Cache::get('ffmpeg_video_height', 960),
            'ffmpeg_input_duration' => Cache::get('ffmpeg_input_duration', 0),
        ];
    }
}
