<?php

namespace Qihucms\PublishVideoPro\Commands;

use App\Plugins\Plugin;
use Illuminate\Console\Command;

class UpgradeCommand extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publish-video-pro:upgrade';

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
        $plugin = new Plugin();

        $upgradeResult = $plugin->upgradePlugin('publish-video-pro');

        switch ($upgradeResult) {
            case 401:
                $this->info('Extension file download failed. Please download it manually according to the tutorial.');
                break;
            case 400:
                $this->info('Check failed.');
                break;
            case 201:
                $this->info('Is currently the latest version.');
                break;
            default:
                $this->call('migrate');
                $this->info('Upgrade success.');
        }
    }
}
