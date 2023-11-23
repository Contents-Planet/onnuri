<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ManageMentController;

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
    Route::get('/getStoreList', [StoreController::class, 'getStoreList']);
});


Route::prefix('/management')->group(function () {
  Route::get('/login', [LoginController::class, 'show'])->middleware('guest')->name('login');
  Route::post('/login', [LoginController::class, 'login'])->middleware('guest')->name('login.perform');
  Route::group(['middleware' => 'auth'], function () {
    Route::get('/', [ManageMentController::class, 'index'])->name('management.mian');
    Route::post('logout', [LoginController::class, 'logout'])->name('logout');
  });
});
