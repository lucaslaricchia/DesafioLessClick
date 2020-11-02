<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setor extends Model
{
    protected $table = 'setores';
    public function ingresso()
    {
        return $this->belongsTo('App\Models\Ingresso');
    }
    use HasFactory;
}
