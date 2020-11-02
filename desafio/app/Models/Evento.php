<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'eventos';
    protected $fillable = ['nome', 'data', 'descricao', 'categoria'];
    protected $with = ['categoria'];
    public function categoria()
    {
        return $this->belongsTo('App\Models\Categoria');
    }

    public function ingressos()
    {
        return $this->hasMany('App\Models\Ingresso');
    }
    
    use HasFactory;
}
