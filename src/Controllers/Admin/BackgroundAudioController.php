<?php

namespace Qihucms\PublishVideoPro\Controllers\Admin;

use Qihucms\PublishVideoPro\Models\BackgroundAudio;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class BackgroundAudioController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = '背景音乐管理';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new BackgroundAudio());

        $grid->model()->latest();

        $grid->column('id', 'ID');
        $grid->column('cover', '封面')->image('', 66, 66);
        $grid->column('title', '名称');
        $grid->column('src', '地址')->downloadable();
        $grid->column('tags', '标签');
        $grid->column('author', '作者');
        $grid->column('recommend', '推荐？')->editable('select', ['不推荐', '推荐']);
        $grid->column('counts', '使用次数')->prefix('已使用')->suffix('次');
        $grid->column('created_at', __('admin.created_at'));
        $grid->column('updated_at', __('admin.updated_at'));

        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(BackgroundAudio::findOrFail($id));

        $show->field('id', 'ID');
        $show->field('title', '歌曲名称');
        $show->field('cover', '封面')->image();
        $show->field('src', '地址')->file();
        $show->field('tags', '标签');
        $show->field('author', '作者');
        $show->field('recommend', '推荐？');
        $show->field('sort', '排序');
        $show->field('counts', '使用次数');
        $show->field('created_at', __('admin.created_at'));
        $show->field('updated_at', __('admin.updated_at'));

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new BackgroundAudio());

        $form->text('title', '歌曲名称');
        $form->image('cover', '封面')->required()
            ->uniqueName()->move('bg_audio/cover')->removable();
        $form->file('src', '音频文件')->required()
            ->uniqueName()->move('bg_audio')->removable();
        $form->text('tags', '标签');
        $form->text('author', '作者');
        $form->select('recommend', '推荐？')->default(0)->options(['不推荐', '推荐']);
        $form->number('sort', '排序')->default(0);
        $form->number('counts', '使用次数')->default(0);

        return $form;
    }
}
