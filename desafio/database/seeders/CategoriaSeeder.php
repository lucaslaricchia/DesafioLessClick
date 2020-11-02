<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categorias')->delete();
        Categoria::create([
            "nome"=>"Jogo"
        ]);
        Categoria::create([
            "nome"=>"Show"
        ]);
        Categoria::create([
            "nome"=>"Outros"
        ]);
    }
}
