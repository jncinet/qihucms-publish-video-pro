<?php

namespace Qihucms\PublishVideoPro\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class BackgroundAudioCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
