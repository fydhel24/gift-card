<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Movimiento extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'tarjeta_gift_card_id',
        'tipo_movimiento',
        'monto',
        'saldo_anterior',
        'saldo_nuevo',
        'descripcion',
        'user_id',
    ];

    protected $casts = [
        'monto' => 'decimal:2',
        'saldo_anterior' => 'decimal:2',
        'saldo_nuevo' => 'decimal:2',
    ];

    public function tarjetaGiftCard(): BelongsTo
    {
        return $this->belongsTo(TarjetaGiftCard::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}