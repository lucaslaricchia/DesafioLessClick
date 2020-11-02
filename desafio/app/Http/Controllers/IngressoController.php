<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIngressoRequest;
use App\Http\Requests\UpdateIngressoRequest;
use App\Models\Evento;
use App\Models\Ingresso;
use Illuminate\Http\Request;

class IngressoController extends Controller
{
    /**
     * Lista ingressos de determinado evento.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Evento $evento)   
    {
        return $evento->ingressos()->with('setor')->paginate(10);
    }

    /**
     * Cria um novo ingresso no banco.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreIngressoRequest $request, $eventoId)
    {
        $evento = Evento::findOrFail($eventoId);
        $ingresso = $evento->ingresso;
        $ingresso = new Ingresso();
        $ingresso->nome = $request->nome;
        $ingresso->valor = $request->valor;
        $ingresso->setor_id = $request->setor_id;
        $ingresso->evento_id = $evento->id;
        $ingresso->save();

        return $ingresso;
    }

    /**
     * Visualizar apenas 1 ingresso.
     *
     * @param  \App\Models\Ingresso  $ingresso
     * @return \Illuminate\Http\Response
     */
    public function show(Ingresso $ingresso)
    {
        return $ingresso;
    }

    /**
     * Atualiza um ingresso ja criado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ingresso  $ingresso
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIngressoRequest $request, Ingresso $ingresso)
    {
        $ingresso->update($request->only(['nome', 'valor', 'setor']));

        return $ingresso;
    }

    /**
     * Deleta um ingresso do banco.
     *
     * @param  \App\Models\Ingresso  $ingresso
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ingresso $ingresso)
    {
        $ingresso->delete();
    }
}
