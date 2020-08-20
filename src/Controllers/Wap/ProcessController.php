<?php

namespace Qihucms\PublishVideoPro\Controllers\Wap;

use App\Http\Controllers\Controller;
use App\Plugins\PublishVideoProPlugin;
use Illuminate\Support\Facades\Cache;
use Qihucms\PublishVideoPro\Models\BackgroundAudio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ProcessController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     * @throws \Exception
     */
    public function index(Request $request)
    {
        $publish = new PublishVideoProPlugin();
        $type = $request->input('type');
        switch ($type) {
            // 背景音乐
            case 'bg_audio':
                $video = $request->input('video');
                if (empty($video)) {
                    return $this->errorJson('视频不存在');
                } else {
                    $video = Storage::url($video);
                }

                $audio = $request->input('audio');
                if (empty($audio)) {
                    return $this->errorJson('音乐不存在');
                } else {
                    $audioModel = BackgroundAudio::find($audio);
                    if ($audioModel) {
                        $audio = Storage::url($audioModel->src);
                        $audioModel->counts += 1;
                        $audioModel->save();
                    } else {
                        return $this->errorJson('音乐不存在');
                    }
                }

                $saveName = $this->saveName();

                $result = $publish->bgMusic($video, $audio, $saveName);
                break;

            // 同款
            case 'tk':
                $sourceVideo = $request->input('source_video');
                if (empty($sourceVideo)) {
                    return $this->errorJson('源视频不存在');
                }

                $newVideo = $request->input('new_video');
                if (empty($newVideo) || !Storage::exists($newVideo)) {
                    return $this->errorJson('视频不存在');
                } else {
                    $newVideo = Storage::url($newVideo);
                }

                $saveName = $this->saveName();

                $result = $publish->avSameStyle($sourceVideo, $newVideo, $saveName);
                break;

            // 合拍
            case 'hp':
                $sourceVideo = $request->input('source_video');
                if (empty($sourceVideo)) {
                    return $this->errorJson('源视频不存在');
                }

                $newVideo = $request->input('new_video');
                if (empty($newVideo) || !Storage::exists($newVideo)) {
                    return $this->errorJson('视频不存在');
                } else {
                    $newVideo = Storage::url($newVideo);
                }

                $saveName = $this->saveName();

                $result = $publish->avSplicing($sourceVideo, $newVideo, $saveName);
                break;

            // 影集
            case 'image_video':
                $audio = $request->input('audio');
                if (empty($audio)) {
                    return $this->errorJson('音乐不存在');
                } else {
                    $audioModel = BackgroundAudio::find($audio);
                    if ($audioModel) {
                        $audio = Storage::url($audioModel->src);
                        $audioModel->counts += 1;
                        $audioModel->save();
                    } else {
                        return $this->errorJson('音乐不存在');
                    }
                }

                $saveName = $this->saveName();
                $images = $request->input('images');
                if (!is_array($images) || count($images) < 1) {
                    return $this->errorJson('图片不存在');
                } else {
                    $pathText = '';
                    $imagesName = $this->saveName('tmp_image_txt', 'txt');
                    Storage::disk('public')->makeDirectory('images/' . Auth::id());

                    foreach ($images as $image) {
                        if (Storage::exists($image['src'])) {
                            $img = Image::make(Storage::get($image['src']));
                            $img->resize(Cache::get('ffmpeg_video_width', 544), null, function ($constraint) {
                                $constraint->aspectRatio();
                            })
                                ->resizeCanvas(Cache::get('ffmpeg_video_width', 544), Cache::get('ffmpeg_video_height', 960), 'center', false, '#000000')
                                ->save(storage_path('app/public/' . $image['src']));
                            $pathText .= 'file \'' . storage_path('app/public/' . $image['src']) . '\'' . PHP_EOL . 'duration 3' . PHP_EOL;
                        }
                    }
                    Storage::disk('public')->put($imagesName, $pathText);
                }

                $result = $publish->imagesToVideo($imagesName, $audio, $saveName);
                break;

            case 'gif':
                // 动图
                $video = $request->input('video');
                if (empty($video) || !Storage::exists($video)) {
                    return $this->errorJson('视频不存在');
                } else {
                    $video = Storage::url($video);
                }

                $saveName = $this->saveName('video_gif', 'gif');

                $result = $publish->avGif($video, $saveName);
                break;

            case 'frame':
                // 缩略图
                $video = $request->input('video');
                if (empty($video) || !Storage::exists($video)) {
                    return $this->errorJson('视频不存在');
                } else {
                    $video = Storage::url($video);
                }

                $saveName = $this->saveName('video_cover', 'jpg');

                $result = $publish->vFrame($video, $saveName);
                break;

            // 转码
            case 'thumb':
                $video = $request->input('video');
                if (empty($video) || !Storage::exists($video)) {
                    return $this->errorJson('视频不存在');
                } else {
                    $video = Storage::url($video);
                }

                $saveName = $this->saveName('short_video', 'mp4');

                $result = $publish->avThumb($video, $saveName);
                break;

            default:
                return $this->errorJson('参数不全');
        }
        if ($result['return_var'] == 0) {
            return $this->successJson('处理成功', ['src' => $saveName, 'url' => Storage::url($saveName)]);
        }
        return $this->errorJson('处理失败', $result);
    }

    protected function saveName($path = 'video', $suffix = 'mp4')
    {
        $path .= DIRECTORY_SEPARATOR . Auth::id();
        Storage::disk('public')->makeDirectory($path);
        return $path . DIRECTORY_SEPARATOR . Str::random(26) . '.' . $suffix;
    }
}
