<?php

namespace Qihucms\PublishVideoPro\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Keyword extends JsonResource
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
            'word' => $this->word,
            'data' => $this->data,
            'count' => intval($this->count)
        ];
    }
}
