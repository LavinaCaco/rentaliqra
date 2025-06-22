<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobil extends Model
{
    use HasFactory;

    protected $table = 'mobil';

     protected $fillable = [
        'merek',
        'seat',
        'harga',
        'keterangan',
        'foto_depan',
        'foto_belakang',
        'foto_samping',
        'foto_dalam',
    ];
}
