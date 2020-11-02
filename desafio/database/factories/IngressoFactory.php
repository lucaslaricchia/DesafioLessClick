<?php

namespace Database\Factories;

use App\Models\Evento;
use App\Models\Ingresso;
use App\Models\Setor;
use Illuminate\Database\Eloquent\Factories\Factory;

class IngressoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Ingresso::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nome' => 'Ingresso para o show do ' . $this->faker->name,
            'valor' => $this->faker->randomFloat(2, 1, 10),
            'setor_id' => Setor::factory(),
            'evento_id' => Evento::factory()
        ];
    }
}
