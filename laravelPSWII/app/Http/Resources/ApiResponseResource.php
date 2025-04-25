<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ApiResponseResource extends JsonResource
{
    public $status;
    public $message;
    public $resource;
    
    public function __construct($status, $message, $resource)
    {
        parent::__construct($resource);
        $this->status  = $status;
        $this->message = $message;
    }

    public function toArray($request)
    {
        return [
            'success' => $this->status,
            'message' => $this->message,
            'data'    => $this->resource,
        ];
    }

    // Static method untuk kemudahan
    public static function success($message, $data)
    {
        return new self(true, $message, $data);
    }

    public static function error($message)
    {
        return new self(false, $message, null);
    }
}
