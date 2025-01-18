<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DebtClaimResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'creditor' => new UserResource($this->creditor), 
            'debtor' => new UserResource($this->debtor), 
            'amount' => $this->amount,
            'status'=>$this->status,
        ];
    }
}
