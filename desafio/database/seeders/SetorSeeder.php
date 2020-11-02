<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setor;
use Illuminate\Support\Facades\DB;

class SetorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('setores')->delete();
        Setor::create([
            "nome"=>"FrontStage"
        ]);
        Setor::create([
            "nome"=>"Indoor"
        ]);
        Setor::create([
            "nome"=>"Camarote"
        ]);
    }
}
