<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PersonalExpense;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonalExpense>
 */
class PersonalExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = PersonalExpense::class;
    public function definition(): array
    {
        $user = User::where('role', 'vip')->inRandomOrder()->first();
        return [
            'name' => $this->faker->word(),
            'date' => $this->faker->date(),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'user_id' => $user->id
        ];
    }
}
