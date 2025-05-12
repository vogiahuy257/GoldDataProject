<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GoldPrice extends Model
{
    use HasFactory;

    protected $table = 'gold_prices';

    protected $fillable = [
        'source',
        'gold_type',
        'buy_price',
        'sell_price',
        'date',
        'time',
        'scraped_at',
    ];

    public $timestamps = false; // vì không dùng created_at, updated_at
}
