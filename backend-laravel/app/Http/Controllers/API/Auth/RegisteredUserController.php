<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @param  RegisterRequest $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (!$user) {
            return $this->responseJson(code: 503, error: true);
        }

        event(new Registered($user));

        Auth::guard('web')->login($user);

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

        return $this->responseJson(data: $responseData, code: 201);
    }
}
