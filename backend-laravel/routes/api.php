<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    require __DIR__ . '/auth.php';
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('user/profile')->controller(ProfileController::class)->group(function () {
        Route::match(['put', 'patch'], 'update', 'update');
        Route::match(['put', 'patch'], 'update-password', 'updatePassword');
        Route::match(['put', 'patch'], '/', 'destroy');
    });

    Route::apiResource('todos', TodoController::class)->parameter('todos', 'item');
});
