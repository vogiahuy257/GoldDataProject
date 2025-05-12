<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GoldPriceController;

    Route::get('gold-prices/source/{source}', [GoldPriceController::class, 'bySource']);

    Route::apiResource('gold-prices', GoldPriceController::class);