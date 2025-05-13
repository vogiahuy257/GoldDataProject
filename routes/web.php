<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
     Route::get('dashboard/pnj', function () {
        return Inertia::render('pnjdata');  // Trang này sẽ hiển thị component React 'PNJData'
    })->name('pnjdata');
    Route::get('dashboard/doji', function () {
        return Inertia::render('dojidata');  // Trang này sẽ hiển thị component React 'PNJData'
    })->name('pnjdata');
    Route::get('dashboard/sjc', function () {
        return Inertia::render('sjcdata');  // Trang này sẽ hiển thị component React 'PNJData'
    })->name('pnjdata');

// Route::middleware(['auth', 'verified'])->group(function () {
    
// });
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
