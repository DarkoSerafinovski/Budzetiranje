<?php

namespace Database\Factories;


use App\Models\GroupExpense;
use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GroupExpense>
 */
class GroupExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = GroupExpense::class;

     

    public function definition(): array
    {

        $group = Group::inRandomOrder()->first();

        return [
            'group_id' => $group->id,
            'payer_id' => $group->users->random()->id, 
            'date' => $this->faker->date(),
            'purpose' => $this->faker->sentence(),
            'amount' => $this->faker->randomFloat(2, 1000, 20000),
        ];
    }
}
