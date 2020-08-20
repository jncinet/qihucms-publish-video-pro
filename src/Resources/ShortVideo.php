<?php

namespace Qihucms\PublishVideoPro\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class ShortVideo extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        // 封面
        if (empty($this->cover)) {
            $cover = Cache::get('config_default_short_video_cover');
        } else {
            $cover = $this->cover;
        }
        $cover = Storage::url($cover);

        return [
            'id' => $this->id,
            'cover' => $cover,
            'src' => empty($this->link) ? Storage::url($this->src) : $this->link,
        ];
    }
}
