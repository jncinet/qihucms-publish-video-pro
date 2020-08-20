<?php

namespace Qihucms\PublishVideoPro\Controllers\Api;

use App\Http\Controllers\Controller;
use Qihucms\PublishVideoPro\Resources\BackgroundAudioCollection;
use Qihucms\PublishVideoPro\Models\BackgroundAudio;
use Illuminate\Http\Request;

class BackgroundAudioController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->get('keyword', '');
        $limit = $request->get('limit', 15);
        if (strlen($keyword) > 0) {
            $result = BackgroundAudio::where('title', 'like', '%' . $keyword . '%')
                ->orWhere('author', 'like', '%' . $keyword . '%')
                ->orWhere('tags', 'like', '%' . $keyword . '%')
                ->orderBy('sort', 'desc')
                ->orderBy('recommend', 'desc')
                ->paginate($limit);
        } else {
            $result = BackgroundAudio::orderBy('sort', 'desc')
                ->orderBy('recommend', 'desc')
                ->paginate($limit);
        }
        return new BackgroundAudioCollection($result);
    }
}
