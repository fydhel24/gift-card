<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('movimientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tarjeta_gift_card_id')->constrained()->onDelete('cascade');
            $table->string('tipo_movimiento');
            $table->decimal('monto', 10, 2);
            $table->decimal('saldo_anterior', 10, 2);
            $table->decimal('saldo_nuevo', 10, 2);
            $table->text('descripcion')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimientos');
    }
};
