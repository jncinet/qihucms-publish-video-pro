<?php

namespace Qihucms\PublishVideoPro\Controllers\Admin;

use App\Plugins\Plugin;
use Encore\Admin\Widgets\Form;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Qihucms\EditEnv\EditEnv;

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
            $result = $plugin->registerPlugin('publish-video-pro', $data['publish-video-proLicenseKey']);
            if ($result) {
                $message .= '；授权激活成功';
            } else {
                $message .= '；授权激活失败';
            }
        }

        unset($data['publish-video-proLicenseKey']);

        $env = new EditEnv();
        $env->setEnv($data);
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
        $this->number('ff_video_width', '视频宽度')->help('转码统一的视频宽度，');
        $this->number('ff_video_height', '视频高度')->help('转码统一的视频高度');
        $this->number('ff_video_duration', '视频时长限制')
            ->help('限制视频发布时长，超出部份会被删除，为0时不限制，单位：秒，如果要动态修改，可以通过类的setInputDuration(15)方法修改');
    }

    public function data()
    {
        return [
            'publish-video-proLicenseKey' => Cache::store('file')->get('publish-video-proLicenseKey'),
            'ff_video_width' => config('qihu.ff_video_width', 544),
            'ff_video_height' => config('qihu.ff_video_height', 960),
            'ff_video_duration' => config('qihu.ff_video_duration', 0),
        ];
    }
}
