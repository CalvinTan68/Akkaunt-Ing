<?php

use App\Http\Controllers\AccountingController;
use App\Http\Controllers\CRUDHistoryController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/', [DashboardController::class, 'index'])
->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DashboardController::class, 'index'])
->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/accounting', [AccountingController::class, 'index'])
->middleware(['auth', 'verified'])->name('accounting');

Route::post('/new', [AccountingController::class, 'store'])
->middleware(['auth', 'verified'])->name('new.accounting');

Route::post('/delete', [AccountingController::class, 'destroy'])
->middleware(['auth', 'verified'])->name('delete.accounting');

Route::get('/history', [CRUDHistoryController::class, 'index'])
->middleware(['auth', 'verified'])->name('history');

Route::get('/download_data', [AccountingController::class, 'download_data'])
->middleware(['auth', 'verified'])->name('download_data');

Route::fallback(function() {
    return redirect("/");
});

require __DIR__.'/auth.php';
