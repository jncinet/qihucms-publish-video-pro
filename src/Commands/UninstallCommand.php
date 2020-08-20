<?php

namespace Qihucms\PublishVideoPro\Commands;

use App\Plugins\Plugin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UninstallCommand extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publishVideoPro:uninstall';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upgrade publish video and precess pro plugin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @return mixed
     */
    public function handle()
    {
        // 删除migrate记录
        DB::table('migrations')
            ->where('migration', 'like', '%_create_background_audio_table')
            ->orWhere('migration', 'like', '%_create_help_videos_table')
            ->delete();

        // 删除表
        Schema::dropIfExists('background_audio');
        Schema::dropIfExists('help_videos');

        // 删除菜单
        $root = DB::table('admin_menu')
            ->where('uri', 'publish-video-pro/background-audios')
            ->value('parent_id');
        DB::table('admin_menu')
            ->where('parent_id', $root)
            ->orWhere('id', $root)
            ->delete();

        // 清除插件缓存
        (new Plugin())->clearPluginCache('publish-video-pro');

        // 删除配置缓存信息
        $configs =  [
            'ffmpeg_video_width', 'ffmpeg_video_height', 'ffmpeg_input_duration'
        ];

        foreach ($configs as $config) {
            Cache::forget($config);
        }

        $this->info('Uninstall successful.');
    }
}
