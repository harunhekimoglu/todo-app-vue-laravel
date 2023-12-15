<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use \Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     *
     * @param  LoginRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = Auth::user();

        if (!$user) {
            return $this->responseJson(code: 503, error: true);
        }

        $responseData = [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'token' => [
                'type' => 'Bearer',
                'value' => $user->createToken('api-token')->plainTextToken,
            ],
        ];

        return $this->responseJson(data: $responseData);
    }

    /**
     * Destroy an authenticated session.
     *
     * @return JsonResponse
     */
    public function destroy(): JsonResponse
    {
        $status = Auth::user()->tokens()->delete();

        Auth::guard('web')->logout();

        return $this->responseJson(error: !$status);
    }
}
