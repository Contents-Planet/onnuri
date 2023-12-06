<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ManageMentController;
use App\Http\Controllers\ExcelContoroller;

  Route::get('/', function () {
    return view('main');
  });

  Route::prefix('/store')->group(function () {
    Route::get('/list', [StoreController::class, 'list'])->name('store.list');
    Route::get('/', [StoreController::class, 'index'])->name('store');
    Route::get('/getCityNames', [StoreController::class, 'getCityNames'])->name('store.city');
    Route::get('/findStore', [StoreController::class, 'findStore'])->name('store.find');
    Route::get('/getStoreList', [StoreController::class, 'getStoreList']);
  });
