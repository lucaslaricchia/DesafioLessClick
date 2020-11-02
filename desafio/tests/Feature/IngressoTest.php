<?php

namespace Tests\Feature;

use App\Models\Evento;
use App\Models\Ingresso;
use App\Models\Setor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IngressoTest extends TestCase
{
    use RefreshDatabase;

    public function test_check_api_is_available()
    {
        $user = User::factory()->create();
        
        $evento = Evento::factory()->make();

        $evento->save();

        $response = $this
            ->actingAs($user)
            ->get('/api/eventos/' . $evento->id . '/ingressos');

        $response->assertStatus(200);
    }

    public function test_try_save_ingresso_successful()
    {
        $user = User::factory()->create();

        $setor = Setor::factory()->make();
        $setor->save();
        $evento = Evento::factory()->make();
        $evento->save();

        $ingressoTest = [
            "nome" => "Ingresso para o show do Safadão",
            'valor' => 12.6,
            'setor_id' => $setor->id
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])->json('POST', '/api/eventos/' . $evento->id . '/ingressos', $ingressoTest);

        $response
            ->assertStatus(201)
            ->assertJson([
                'id' => 1
            ]);
    }

    public function test_try_save_ingresso_with_invalid_nome()
    {
        $user = User::factory()->create();

        $setor = Setor::factory()->make();
        $setor->save();

        $evento = Evento::factory()->make();
        $evento->save();

        $ingressoTest = [
            "id" => 10,
            "nome" => "",
            'valor' => 12.6,
            'setor_id' => $setor->id
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos/' . $evento->id . '/ingressos', $ingressoTest);

        $response
        ->assertStatus(422)
        ->assertJson([
            'message' => 'The given data was invalid.',
        ]);
    }

    public function test_try_save_ingresso_with_a_non_existent_evento()
    {
        $user = User::factory()->create();

        $setor = Setor::factory()->make();
        $setor->save();

        $ingressoTest = [
            "nome" => "Ingresso para o show do Safadão",
            'valor' => 12.6,
            'setor_id' => $setor->id
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos/' . 99 . '/ingressos', $ingressoTest);

        $response->assertStatus(404);
    }

    public function test_try_save_ingresso_with_invalid_setor()
    {
        $user = User::factory()->create();

        $evento = Evento::factory()->make();
        $evento->save();

        $ingressoTest = [
            "id" => 1,
            "nome" => "Ingresso para o show do Safadão",
            'valor' => 12.6,
            'setor_id' => 50
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos/' . $evento->id . '/ingressos', $ingressoTest);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
            ]);
    }

    public function test_update_nome_of_exists_ingresso()
    {
        $user = User::factory()->create();

        $ingresso = Ingresso::factory()->make();

        $ingresso->save();

        $ingressoTest = [
            "nome" => "Novo nome para o ingresso"
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('PATCH', '/api/ingressos/' . $ingresso->id, $ingressoTest);

        $response
            ->assertStatus(200)
            ->assertJson($ingressoTest);
    }

    public function test_delete_exists_ingresso()
    {
        $user = User::factory()->create();

        $ingresso = Ingresso::factory()->make();

        $ingresso->save();

        $response = $this
            ->actingAs($user)
            ->json('DELETE', '/api/ingressos/' . $ingresso->id);

        $response->assertStatus(200);

        $response = $this
            ->actingAs($user)
            ->get('/api/ingressos/' . $ingresso->id);

        $response->assertStatus(404);
    }
}
