<?php

namespace Qihucms\PublishVideoPro;

use Illuminate\Support\ServiceProvider;
use Qihucms\PublishVideoPro\Commands\InstallCommand;
use Qihucms\PublishVideoPro\Commands\UninstallCommand;
use Qihucms\PublishVideoPro\Commands\UpgradeCommand;

class PublishVideoProServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                InstallCommand::class,
                UninstallCommand::class,
                UpgradeCommand::class
            ]);
        }

        $this->loadRoutesFrom(__DIR__ . '/../routes.php');

        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'publishVideoPro');

        $this->publishes([
            __DIR__ . '/../resources/js' => resource_path('js'),
            __DIR__ . '/../resources/asset' => public_path('vendor/publish-video'),
        ], 'publish-video');
    }
}
