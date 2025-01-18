<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\User;
use App\Models\GroupExpense;
use App\Models\DebtClaim;
use App\Models\PersonalExpense;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(5)->state(['role' => 'admin'])->create();
        $users = User::factory(20)->create();
        $groups = Group::factory(5)
            ->hasAttached($users->random(10)) 
            ->create();
    
        // Kreiraj grupne troškove
        $expenses = GroupExpense::factory(10)->create();
        $personalExpenses = PersonalExpense::factory(10)->create();
    
        // Generiši dugove za svaki trošak
        $expenses->each(function (GroupExpense $expense) {
            $groupUsers = $expense->group->users; // Svi članovi grupe
            $creditor = $expense->payer; // Ko je platio trošak
            $debtAmount = $expense->amount / ($groupUsers->count() - 1); // Podeli na ostale članove
    
            // Kreiraj dug za svakog člana koji nije platioc
            $groupUsers->where('id', '!=', $creditor->id)->each(function ($debtor) use ($expense, $creditor, $debtAmount) {
                DebtClaim::create([
                    'expense_id' => $expense->id,
                    'creditor_id' => $creditor->id,
                    'debtor_id' => $debtor->id,
                    'amount' => $debtAmount,
                    'status' => 'unpaid'
                ]);
            });
        });
    }
    
}
