<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'ci',
        'email',
        'celular',
        'direccion',
        'fecha_nacimiento',
        'genero',
        'activo',
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date',
        'activo' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function tarjetasGift(): HasMany
    {
        return $this->hasMany(\App\Models\TarjetaGiftCard::class);
    }
}