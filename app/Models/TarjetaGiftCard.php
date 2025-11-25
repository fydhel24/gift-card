<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TarjetaGiftCard extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'codigo_unico',
        'saldo_inicial',
        'saldo_actual',
        'url_qr',
        'estado',
        'fecha_expiracion',
        'tipo',
        'cliente_id',
        'user_id',
    ];

    protected $casts = [
        'saldo_inicial' => 'decimal:2',
        'saldo_actual' => 'decimal:2',
        'fecha_expiracion' => 'date',
    ];      

    // Una tarjeta pertenece a un cliente
    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }

}