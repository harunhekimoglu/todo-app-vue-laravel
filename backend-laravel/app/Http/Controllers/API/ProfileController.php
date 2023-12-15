<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateRequest;
use App\Http\Requests\Profile\UpdatePasswordRequest;
use App\Http\Requests\Profile\DestroyRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest $request
     * @return JsonResponse
     */
    public function update(UpdateRequest $request): JsonResponse
    {
        $user = Auth::user();

        $status = $user->update($request->validated());

        if (!$status) {
            return $this->responseJson(code: 503, error: true);
        }

        $responseData = [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
        ];

        return $this->responseJson(data: $responseData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePasswordRequest $request
     * @return JsonResponse
     */
    public function updatePassword(UpdatePasswordRequest $request): JsonResponse
    {
        $user = Auth::user();

        $data = $request->validated();
        $password = Hash::make($data['password']);

        $status = $user->update(['password' => $password]);

        if (!$status) {
            return $this->responseJson(code: 503, error: true);
        }

        return $this->responseJson();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  DestroyRequest $request
     * @return JsonResponse
     */
    public function destroy(DestroyRequest $request): JsonResponse
    {
        $user = Auth::user();

        $status = $user->delete();

        if (!$status) {
            return $this->responseJson(code: 503, error: true);
        }

        return $this->responseJson(error: !$status);
    }
}
