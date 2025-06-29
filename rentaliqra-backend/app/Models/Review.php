<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model {
    
    use HasFactory;
    protected $fillable = ['sewa_id', 'user_id', 'mobil_id', 'rating', 'komentar'];

    public function user() { return $this->belongsTo(User::class); }
    public function mobil() { return $this->belongsTo(Mobil::class); }
    public function sewa() { return $this->belongsTo(Sewa::class); }
}