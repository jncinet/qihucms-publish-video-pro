<?php

namespace Qihucms\PublishVideoPro\Jobs;

use App\Models\ShortVideo;
use App\Services\VideoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProcessVideo implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $shortVideo;

    /**
     * Create a new job instance.
     *
     * @param ShortVideo $shortVideo
     * @return void
     */
    public function __construct(ShortVideo $shortVideo)
    {
        $this->shortVideo = $shortVideo;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        // 转码压缩
        if (Cache::get('config_avsmart_status') && !empty($this->shortVideo->src)) {
            $saveName = $this->saveName('short_video', $this->shortVideo->user_id, 'mp4');
            $run_result = app('videoFFMpeg')->avThumb($this->shortVideo->src, $saveName);
            if ($run_result['return_var'] == 0) {
                $this->shortVideo->src = $saveName;
                $this->shortVideo->save();
            }
        }
    }

    protected function saveName($path = 'video', $user_id = 0, $suffix = 'mp4')
    {
        $path .= DIRECTORY_SEPARATOR . $user_id;
        Storage::disk('public')->makeDirectory($path);
        return $path . DIRECTORY_SEPARATOR . Str::random(26) . '.' . $suffix;
    }
}
