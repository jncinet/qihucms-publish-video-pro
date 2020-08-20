<?php

namespace Qihucms\PublishVideoPro\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BackgroundAudio extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'cover' => Storage::url($this->cover),
            'url' => Storage::url($this->src),
            'src' => $this->src,
            'tags' => $this->tags,
            'author' => $this->author,
            'recommend' => boolval($this->recommend),
            'counts' => intval($this->counts),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans()
        ];
    }
}
