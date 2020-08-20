<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBackgroundAudioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('background_audio', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->comment('标题');
            $table->string('cover')->nullable()->comment('封面');
            $table->string('src')->comment('音乐地址');
            $table->string('tags')->nullable()->comment('标签');
            $table->string('author')->nullable()->comment('作者');
            $table->boolean('recommend')->default(0)->comment('是否推荐');
            $table->unsignedBigInteger('sort')->default(0)->comment('排序');
            $table->unsignedBigInteger('counts')->default(0)->comment('使用次数');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('background_audio');
    }
}
