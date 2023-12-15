<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * responseJson
     *
     * @param  mixed $data
     * @param  int $code
     * @param  bool $error
     * @param  string $message
     * @return JsonResponse
     */
    protected function responseJson(mixed $data = null, int $code = 200, bool $error = false, string $message = ""): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'error' => $error,
            'message' => $message,
        ], $code);
    }
}
