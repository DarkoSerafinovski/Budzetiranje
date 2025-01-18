<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DebtClaim extends Model
{
    use HasFactory;

    protected $fillable = ['expense_id', 'creditor_id', 'debtor_id', 'amount','status'];

    public function expense()
    {
        return $this->belongsTo(GroupExpense::class);
    }

    public function creditor()
    {
        return $this->belongsTo(User::class, 'creditor_id');
    }

    public function debtor()
    {
        return $this->belongsTo(User::class, 'debtor_id');
    }

   
}
