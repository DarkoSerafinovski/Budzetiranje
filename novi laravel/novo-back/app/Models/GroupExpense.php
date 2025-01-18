<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupExpense extends Model
{
    use HasFactory;


    protected $fillable = ['group_id', 'payer_id', 'date', 'purpose', 'amount'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function payer()
    {
        return $this->belongsTo(User::class, 'payer_id');
    }

    public function debtsClaims()
    {
        return $this->hasMany(DebtClaim::class, 'expense_id');
    }

    protected $casts = [
        'date' => 'datetime', 
    ];
}
