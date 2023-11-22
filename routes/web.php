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
    Route::get('/', [StoreController::class, 'index'])->name('store');
    Route::get('/getCityNames', [StoreController::class, 'getCityNames'])->name('store.city');
    Route::get('/findStore', [StoreController::class, 'findStore'])->name('store.find');
    Route::get('/getStoreList', [StoreController::class, 'getStoreList'])->name('store.list');

});
