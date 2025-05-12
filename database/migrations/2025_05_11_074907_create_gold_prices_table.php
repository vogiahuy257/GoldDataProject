<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('gold_prices', function (Blueprint $table) {
            $table->id();
            $table->string('source', 20);                // SJC / DOJI / PNJ
            $table->string('gold_type', 100)->nullable();            // Loại vàng
            $table->string('buy_price', 225)->nullable();            // Giá mua
            $table->string('sell_price', 225)->nullable();           // Giá bán
            $table->date('date')->nullable();            // Ngày cập nhật
            $table->time('time')->nullable();            // Giờ cập nhật
            $table->timestamp('scraped_at')->useCurrent(); // Thời điểm hệ thống lấy dữ liệu

            $table->index(['gold_type', 'date'], 'ix_gold_type_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gold_prices');
    }
};

