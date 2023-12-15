<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randArr = [true, false, null];

        return [
            'creator_id' => User::factory(),
            'title' => fake()->unique()->sentence(),
            'description' => $randArr[rand(0, 2)]
                ? fake()->sentences(3, true)
                : null,
            'is_done' => false,
            'done_at' => null,
        ];
    }
}
