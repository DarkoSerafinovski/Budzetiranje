<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupExpenseResource extends JsonResource
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
            'payer' => new UserResource($this->payer), 
            'date' => $this->date->toIso8601String(),
            'purpose' => $this->purpose,
            'amount' => $this->amount,
            'debts' => DebtClaimResource::collection($this->debtsClaims), 
        ];
    }
}
