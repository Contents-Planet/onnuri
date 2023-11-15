<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('main');
});


Route::prefix('/store')->group(function () {
    Route::get('/list', [StoreController::class, 'list'])->name('store.list');
    Route::get('/main', [StoreController::class, 'index'])->name('store');
});
