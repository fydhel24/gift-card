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
        Schema::create('tarjeta_gift_cards', function (Blueprint $table) {
            $table->id();
            $table->string('codigo_unico')->unique();
            $table->decimal('saldo_inicial', 10, 2);
            $table->decimal('saldo_actual', 10, 2);
            $table->text('url_qr')->nullable();
            $table->enum('estado', ['activa', 'inactiva'])->default('activa');
            $table->date('fecha_expiracion')->nullable();
            $table->string('tipo')->nullable();
            $table->foreignId('cliente_id')->constrained()->onDelete('cascade');
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
        Schema::dropIfExists('tarjeta_gift_cards');
    }
};
