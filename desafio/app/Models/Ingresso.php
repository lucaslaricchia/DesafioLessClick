<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingresso extends Model
{
    protected $table = 'ingressos';
    protected $hidden = ['setor_id'];
    protected $fillable = ['nome', 'valor', 'setor_id', 'evento_id'];
    public function setor()
    {
        return $this->belongsTo('App\Models\setor');
    }

    public function evento()
    {
        return $this->belongsTo('App\Models\Evento');
    }
    
    use HasFactory;
}
