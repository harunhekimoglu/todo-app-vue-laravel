<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Auth\AuthenticatedSessionController;
// use App\Http\Controllers\API\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\API\Auth\NewPasswordController;
use App\Http\Controllers\API\Auth\PasswordResetLinkController;
use App\Http\Controllers\API\Auth\RegisteredUserController;
// use App\Http\Controllers\API\Auth\VerifyEmailController;

Route::post('/register', [RegisteredUserController::class, 'store']);

Route::post('/login', [AuthenticatedSessionController::class, 'store']);

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);

Route::post('/reset-password', [NewPasswordController::class, 'store']);

// Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
//     ->middleware(['auth', 'signed', 'throttle:6,1'])
//     ->name('verification.verify');

// Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
//     ->middleware(['auth', 'throttle:6,1'])
//     ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');
