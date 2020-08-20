<?php

namespace Qihucms\PublishVideoPro\Models;

use Illuminate\Database\Eloquent\Model;

class BackgroundAudio extends Model
{
    protected $fillable = [
        'title', 'cover', 'src', 'tags', 'author', 'recommend', 'sort', 'counts'
    ];
}
