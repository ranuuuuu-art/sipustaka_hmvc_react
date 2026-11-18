<?php

namespace Modules\Peminjaman\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'peminjaman';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama_peminjam',
        'judul_buku',
        'tanggal_pinjam',
        'tanggal_kembali',
        'status',
        'bukti',
        'nama_bukti',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_pinjam' => 'date:Y-m-d',
        'tanggal_kembali' => 'date:Y-m-d',
    ];

    /**
     * The accessors to append to the model's array and JSON form.
     *
     * @var list<string>
     */
    protected $appends = [
        'bukti_url',
    ];

    /**
     * Public URL of the uploaded file, or null when there is no file.
     */
    protected function buktiUrl(): Attribute
    {
        return Attribute::get(fn (): ?string => $this->bukti ? asset('storage/'.$this->bukti) : null);
    }
}