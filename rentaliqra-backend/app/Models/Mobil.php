<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Review; 

class Mobil extends Model
{
    use HasFactory;

    protected $table = 'mobil';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'merek',
        'tipe',
        'status',
        'seat',
        'harga',
        'keterangan',
        'foto_depan',
        'foto_belakang',
        'foto_samping',
        'foto_dalam',
    ];

    public function sewa()
    {
        return $this->hasMany(Sewa::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class)->latest();
    }
}