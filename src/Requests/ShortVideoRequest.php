<?php

namespace Qihucms\PublishVideoPro\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ShortVideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'src' => ['required_without:link'],
            'desc' => ['required'],
            'link' => ['nullable','url'],
            'price' => ['min:0','integer']
        ];
    }

    public function messages()
    {
        return [
            'required_without' => '请上传视频或填写视频外链',
            'required' => ':attribute必须填写',
            'url' => ':attribute必须是视频地址',
            'min' => ':attribute必须是大于等于0的整数',
            'integer' => ':attribute必须是大于等于0的整数',
        ];
    }

    public function attributes()
    {
        return [
            'src' => '视频',
            'desc' => '视频介绍',
            'link' => '视频外链',
            'price' => '收费价格'
        ];
    }
}
