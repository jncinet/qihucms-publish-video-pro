<?php

use Illuminate\Routing\Router;

// 接口
Route::group([
    'prefix' => 'publish-video-pro',
    // 控制器命名空间
    'namespace' => 'Qihucms\PublishVideoPro\Controllers\Api',
    'middleware' => ['api'],
], function (Router $router) {
    // 背景音乐
    $router->get('background-audio', 'BackgroundAudioController@index')
        ->name('publish-video-pro.api.background-audio.index');
    // 视频标签
    $router->get('tags', 'TagController@index')
        ->name('publish-video-pro.api.tags.index');
    // 帮助视频
    $router->get('help-video', 'HelpVideoController@index')
        ->name('publish-video-pro.api.help-video.index');
    // 视频数据调用
    $router->get('short-video', 'VideoController@index')
        ->name('publish-video-pro.api.short-video.index');
});

// 手机端
Route::group([
    // 页面URL前缀
    'prefix' => 'publish-video-pro',
    // 控制器命名空间
    'namespace' => 'Qihucms\PublishVideoPro\Controllers\Wap',
    'middleware' => ['web']
], function (Router $router) {
    // 处理
    $router->post('process', 'ProcessController@index')->middleware('auth')
        ->name('publish-video-pro.process');
    // 发布
    $router->post('store', 'VideoController@store')->middleware('auth')
        ->name('publish-video-pro.store');
    // 定位
    $router->get('location', 'VideoController@location')->middleware('auth')
        ->name('publish-video-pro.location');
    // 发布页
    $router->get('create', 'VideoController@create')->middleware('auth')
        ->name('publish-video-pro.create');
});

// 后台管理
Route::group([
    // 后台使用laravel-admin的前缀加上扩展的URL前缀
    'prefix' => config('admin.route.prefix') . '/publish-video-pro',
    // 后台管理的命名空间
    'namespace' => 'Qihucms\PublishVideoPro\Controllers\Admin',
    // 后台的中间件，限制管理权限才能访问
    'middleware' => config('admin.route.middleware'),
], function (Router $router) {
    // 背景音乐管理
    $router->resource('background-audios', 'BackgroundAudioController', ['as' => 'admin']);
    // 视频帮助管理
    $router->resource('help-videos', 'HelpVideoController', ['as' => 'admin']);
    // 配置
    $router->get('config', 'ConfigController@index')->name('admin.publish-video-pro.config');
});