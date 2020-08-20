<?php

namespace Qihucms\PublishVideoPro\Controllers\Admin;

use Qihucms\PublishVideoPro\Models\HelpVideo;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class HelpVideoController extends AdminController
{
    /**
     * Title for current resource.
     *
     * @var string
     */
    protected $title = '帮助视频';

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $grid = new Grid(new HelpVideo());
        $grid->model()->orderBy('sort', 'desc')->orderBy('id', 'desc');

        $grid->column('id', 'ID');
        $grid->column('sort', '排序')->editable();
        $grid->column('title', '标题');
        $grid->column('cover', '封面')->image('', 66);
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
        $show = new Show(HelpVideo::findOrFail($id));

        $show->field('id', 'ID');
        $show->field('title', '标题');
        $show->field('cover', '封面')->image();
        $show->field('src', '视频')->file();
        $show->field('sort', '排序');
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
        $form = new Form(new HelpVideo());

        $form->text('title', '标题');
        $form->image('cover', '封面')
            ->uniqueName()->move('help_video/cover')->removable();
        $form->file('src', '视频')
            ->uniqueName()->move('help_video/video')->removable();
        $form->number('sort', '排序')->default(0);

        return $form;
    }
}
