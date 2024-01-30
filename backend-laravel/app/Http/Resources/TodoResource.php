<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\DateTimeHelper;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['status'] = $this->is_done ? 'Finished' : 'Open';
        $data['done_at'] = DateTimeHelper::getViewDateTime($this->done_at);
        $data['updated_at'] = DateTimeHelper::getViewDateTime($this->updated_at);
        $data['created_at'] = DateTimeHelper::getViewDateTime($this->created_at);

        return $data;
    }
}
