<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalExpense extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'amount',
        'user_id',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    protected $casts = [
        'date' => 'datetime', 
    ];

}
