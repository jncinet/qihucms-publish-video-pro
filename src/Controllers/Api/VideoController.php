<?php

namespace Qihucms\PublishVideoPro\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Video\ShortVideoCollection;
use App\Models\ShortVideo;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->input('keyword');
        if ($keyword) {
            $result = ShortVideo::select('id', 'cover', 'src', 'link')
                ->where('price', 0)
                ->where('status', 1)
                ->where('desc', 'like', '%' . $keyword . '%')
                ->orWhere(function ($query) use ($keyword) {
                    $query->where('tags', 'like', '%' . $keyword . '%')->where('status', 1)->where('price', 0);
                })
                ->orWhere(function ($query) use ($keyword) {
                    $query->where('city', 'like', '%' . $keyword . '%')->where('status', 1)->where('price', 0);
                })
                ->orderBy('heat', 'desc')
                ->orderBy('like', 'desc')
                ->orderBy('id', 'desc')
                ->paginate();
        } else {
            $result = ShortVideo::select('id', 'cover', 'src')
                ->where('status', 1)
                ->where('price', 0)
                ->orderBy('heat', 'desc')
                ->orderBy('like', 'desc')
                ->orderBy('id', 'desc')
                ->paginate();
        }
        return new ShortVideoCollection($result);
    }
}
