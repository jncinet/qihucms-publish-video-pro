<?php

namespace Qihucms\PublishVideoPro\Models;

use Illuminate\Database\Eloquent\Model;

class HelpVideo extends Model
{
    protected $fillable = [
        'title', 'cover', 'src', 'sort'
    ];
}
