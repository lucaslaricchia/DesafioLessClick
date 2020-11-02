<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventoRequest;
use App\Http\Requests\UpdateEventoRequest;
use App\Models\Categoria;
use App\Models\Evento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    /**
     * Lista todos os eventos.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Evento::with('categoria')->paginate(10);
    }

    /**
     * Cria um novo evento.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEventoRequest $request)
    {

        $categoria = Categoria::find($request->categoria_id);
        $evento = new Evento();
        $evento->nome = $request->nome;
        $evento->data = $request->data;
        $evento->categoria_id = $categoria->id;
        $evento->descricao = $request->descricao;
        $evento->save();

        return $evento;
    }

    /**
     * Mostra apenas 1 evento.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function show(Evento $evento)
    {
        return $evento;
    }

    /**
     * Atualiza o evento escolhido.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEventoRequest $request, Evento $evento)
    {
        $evento->update($request->all());
        return $evento;
    }

    /**
     * Deleta um evento do banco.
     *
     * @param  \App\Models\Evento  $evento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Evento $evento)
    {
        $evento->delete();
    }
}
