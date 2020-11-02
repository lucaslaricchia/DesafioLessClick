<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngressosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */ 
    // (nome, valor, setor);
    public function up()
    {
        Schema::create('ingressos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->double('valor', 8, 2);
            $table->integer('setor_id');
            $table->integer('evento_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingressos');
    }
}
