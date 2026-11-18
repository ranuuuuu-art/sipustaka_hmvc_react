<?php

namespace Modules\Buku\Models;

use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'buku';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'judul',
        'penulis',
        'penerbit',
        'tahun_terbit',
        'stok',
    ];
}