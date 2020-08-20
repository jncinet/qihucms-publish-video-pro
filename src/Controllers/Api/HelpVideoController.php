<?php

namespace Qihucms\PublishVideoPro\Controllers\Api;

use App\Http\Controllers\Controller;
use Qihucms\PublishVideoPro\Resources\HelpVideoCollection;
use Qihucms\PublishVideoPro\Models\HelpVideo;
use Illuminate\Http\Request;

class HelpVideoController extends Controller
{
    protected $help;

    public function __construct(HelpVideo $helpVideo)
    {
        $this->help = $helpVideo;
    }

    public function index()
    {
        $result = $this->help->orderBy('sort', 'desc')->orderBy('id', 'desc')->get();
        return new HelpVideoCollection($result);
    }
}
