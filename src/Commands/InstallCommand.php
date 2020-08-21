<?php

namespace Qihucms\PublishVideoPro\Commands;

use App\Plugins\Plugin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class InstallCommand extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publish-video-pro:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install publish video and precess pro plugin';

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
        $plugin = new Plugin();

        if ($this->installed()) {
            $this->info('Database table already exists');
        } elseif (!class_exists('App\\Plugins\\PublishVideoProPlugin')) {
            $this->error('Please download plugin manually according to the tutorial.');
        } else {
            // 数据库迁移
            $this->call('migrate');

            // 创建管理菜单
            $plugin->createPluginAdminMenu('视频发布', [
                ['title' => '背景音乐', 'uri' => 'publish-video-pro/background-audios'],
                ['title' => '视频帮助', 'uri' => 'publish-video-pro/help-videos'],
                ['title' => '发布配置', 'uri' => 'publish-video-pro/config'],
            ]);

            // 缓存版本
            $plugin->setPluginVersion('publish-video-pro', 100);

            $this->info('Install success');
        }
    }

    // 是否安装过
    protected function installed()
    {
        // 验证表是否存在
        return Schema::hasTable('background_audio') || Schema::hasTable('help_videos')
            || DB::table('migrations')
                ->where('migration', 'like', '%_create_background_audio_table')
                ->orWhere('migration', 'like', '%_create_help_videos_table')
                ->exists();
    }
}
