<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\Todo\StoreRequest;
use App\Http\Requests\Todo\UpdateRequest;
use App\Http\Resources\TodoCollection;
use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  Request $request
     * @return TodoCollection
     */
    public function index(Request $request): TodoCollection
    {
        $isDone = $request->filter['is_done'] ?? false;

        if ($isDone === "true") {
            $data = Todo::where('is_done', true)->get();
        } else {
            $data = Todo::where('is_done', false)->get();
        }
        return new TodoCollection($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreRequest $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $item = Auth::user()->todos()->create($request->validated());

        if (!$item) {
            return $this->responseJson(code: 503, error: true);
        }

        return $this->responseJson(code: 201, data: new TodoResource($item));
    }

    /**
     * Display the specified resource.
     *
     * @param  Todo $item
     * @return JsonResponse
     */
    public function show(Todo $item): JsonResponse
    {
        return $this->responseJson(data: new TodoResource($item));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest $request
     * @param  Todo $item
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, Todo $item): JsonResponse
    {
        $data = $request->validated();

        if (isset($data['is_done']) && $data['is_done'] && !isset($data['done_at'])) {
            $data['done_at'] = now();
        }
        if (isset($data['is_done']) && !$data['is_done'] && !isset($data['done_at'])) {
            $data['done_at'] = null;
        }

        $status = $item->update($data);

        if (!$status) {
            return $this->responseJson(code: 503, error: true);
        }

        return $this->responseJson(data: new TodoResource($item));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Todo $item
     * @return JsonResponse
     */
    public function destroy(Todo $item): JsonResponse
    {
        $status = $item->delete();

        if (!$status) {
            return $this->responseJson(code: 503, error: true);
        }

        return $this->responseJson(error: !$status);
    }
}
