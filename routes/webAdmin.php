<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ManageMentController;
use App\Http\Controllers\ExcelContoroller;

Route::get('/', [ManageMentController::class, 'index'])->name('management.mian');
Route::get('/login', [LoginController::class, 'show'])->middleware('guest')->name('login');
Route::post('/login', [LoginController::class, 'login'])->middleware('guest')->name('login.perform');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::post('/excelUpload', [ExcelContoroller::class, 'excelToData'])->middleware('auth')->name('excel.upload');
Route::post('/excelDownload', [ExcelContoroller::class, 'dataToExcel'])->middleware('auth')->name('excel.download');

Route::prefix('/management')->group(function () {
  Route::group(['middleware' => 'auth'], function () {
    Route::get('/detail/{seq?}', [ManageMentController::class, 'detail'])->name('management.detail');
    Route::post('/save', [ManageMentController::class, 'save'])->name('management.save');
    Route::post('/', [ManageMentController::class, 'searchSecondDepth'])->name('store.search_depth2');
  });
});
