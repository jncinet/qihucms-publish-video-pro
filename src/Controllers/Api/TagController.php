<?php

namespace Qihucms\PublishVideoPro\Controllers\Api;

use App\Http\Controllers\Controller;
use Qihucms\PublishVideoPro\Resources\KeywordCollection;
use App\Models\Keyword;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * 标签列表
     *
     * @param Request $request
     * @return KeywordCollection
     */
    public function index(Request $request)
    {
        $keyword = $request->get('keyword');
        $type = $request->get('type', 'short_video');
        $limit = $request->get('limit', 15);
        if ($keyword) {
            $result = Keyword::where('type', $type)
                ->where('word', 'like', '%' . $keyword . '%')
                ->select('id', 'word', 'count')
                ->latest()
                ->paginate($limit);
        } else {
            $result = Keyword::where('type', $type)
                ->select('id', 'word', 'count')
                ->orderBy('count', 'desc')
                ->orderBy('id', 'desc')
                ->paginate($limit);
        }
        return new KeywordCollection($result);
    }
}
