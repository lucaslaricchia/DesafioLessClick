<?php

namespace Tests\Feature;

use App\Models\Categoria;
use App\Models\Evento;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EventoTest extends TestCase
{

    use RefreshDatabase;

    public function test_check_eventos_api_is_available()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/api/eventos');

        $response->assertStatus(200);
    }

    public function test_try_save_evento_with_data_before_now()
    {
        $user = User::factory()->create();

        $categoria = Categoria::factory()->make();

        $categoria->save();

        $eventoTest = [
            "id" => 1,
            "nome" => "Evento da Marlin Roads",
            "data" => "1988-05-12 00:00:00",
            "categoria_id" => $categoria->id,
            "descricao" => "Eum pariatur praesentium voluptatibus qui."
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos', $eventoTest);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
            ]);
    }

    public function test_try_save_evento_with_invalid_categoria()
    {
        $user = User::factory()->create();

        $eventoTest = [
            "id" => 1,
            "nome" => "Evento da Marlin Roads",
            "data" => "1988-05-12 00:00:00",
            "categoria_id" => 5,
            "descricao" => "Eum pariatur praesentium voluptatibus qui."
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos', $eventoTest);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
            ]);
    }

    public function test_try_save_evento_with_blank_nome_or_descricao()
    {
        $user = User::factory()->create();

        $categoria = Categoria::factory()->make();

        $categoria->save();

        $eventoTest = [
            "id" => 1,
            "nome" => "",
            "data" => "1988-05-12 00:00:00",
            "categoria_id" => $categoria->id,
            "descricao" => ""
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos', $eventoTest);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
            ]);
    }

    public function test_try_save_evento_with_nome_already_exists()
    {
        $user = User::factory()->create();

        $categoria = Categoria::factory()->make();

        $categoria->save();

        $eventoTest = [
            "id" => 1,
            "nome" => "Evento da Marlin Roads",
            "data" => "1988-05-12 00:00:00",
            "categoria_id" => $categoria->id,
            "descricao" => "Eum pariatur praesentium voluptatibus qui."
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos', $eventoTest);

        $eventoTest['id'] = 2;

        $response = $this->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos', $eventoTest);

        $response
            ->assertStatus(422)
            ->assertJson([
                'message' => 'The given data was invalid.',
            ]);
    }

    public function test_save_evento_successful()
    {
        $user = User::factory()->create();

        $categoria = Categoria::factory()->make();

        $categoria->save();

        $eventoTest = [
            "id" => 1,
            "nome" => "Evento da Marlin Roads",
            "data" => "2025-05-12 00:00:00",
            "categoria_id" => $categoria->id,
            "descricao" => "Eum pariatur praesentium voluptatibus qui."
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('POST', '/api/eventos', $eventoTest);

        $response
            ->assertStatus(201)
            ->assertJson([
                'id' => 1
            ]);
    }

    public function test_update_nome_of_exists_evento()
    {
        $user = User::factory()->create();

        $evento = Evento::factory()->make();

        $evento->save();

        $eventoTest = [
            "nome" => "Novo nome para o evento"
        ];

        $response = $this
            ->actingAs($user)
            ->withHeaders([
            'Content-Type' => 'application/json',
        ])->json('PATCH', '/api/eventos/' . $evento->id, $eventoTest);

        $response
            ->assertStatus(200)
            ->assertJson($eventoTest);
    }

    public function test_delete_exists_event()
    {
        $user = User::factory()->create();

        $evento = Evento::factory()->make();

        $evento->save();

        $response = $this
            ->actingAs($user)
            ->json('DELETE', '/api/eventos/' . $evento->id);

        $response->assertStatus(200);

        $response = $this
            ->actingAs($user)
            ->get('/api/eventos/' . $evento->id);

        $response->assertStatus(404);
    }
}
