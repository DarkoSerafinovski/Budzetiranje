<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username', 'email', 'password','role','slika'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }

    public function paidExpenses()
    {
        return $this->hasMany(GroupExpense::class, 'payer_id');
    }

    public function debts()
    {
        return $this->hasMany(DebtClaim::class, 'debtor_id');
    }

    public function claims()
    {
        return $this->hasMany(DebtClaim::class, 'creditor_id');
    }

    public function personalExpenses(){
        return $this->hasMany(PersonalExpense::class);
    }
}
