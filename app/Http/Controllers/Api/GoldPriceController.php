<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GoldPrice;
use Illuminate\Http\Request;

class GoldPriceController extends Controller
{
    // Danh sách tất cả bản ghi
    public function index()
    {
        return response()->json(GoldPrice::all(), 200);
    }

    // Lấy dữ liệu của SJC
    public function bySource($source)
    {
        $allowed = ['SJC', 'DOJI', 'PNJ'];
        if (!in_array(strtoupper($source), $allowed)) {
            return response()->json(['message' => 'Source not supported'], 400);
        }

        $data = GoldPrice::where('source', strtoupper($source))->get();
        return response()->json($data, 200);
    }


    // Thêm mới
    public function store(Request $request)
    {
        $validated = $request->validate([
            'source' => 'required|string|max:20',
            'gold_type' => 'nullable|string|max:100',
            'buy_price' => 'nullable|string|max:225',
            'sell_price' => 'nullable|string|max:225',
            'date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i:s',
            'scraped_at' => 'nullable|date',
        ]);

        $goldPrice = GoldPrice::create($validated);
        return response()->json($goldPrice, 201); // 201 Created
    }

    // Lấy 1 bản ghi cụ thể
    public function show($id)
    {
        $goldPrice = GoldPrice::find($id);

        if (!$goldPrice) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        return response()->json($goldPrice, 200);
    }

    // Cập nhật 1 bản ghi
    public function update(Request $request, $id)
    {
        $goldPrice = GoldPrice::find($id);
        if (!$goldPrice) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $validated = $request->validate([
            'source' => 'sometimes|required|string|max:20',
            'gold_type' => 'nullable|string|max:100',
            'buy_price' => 'nullable|string|max:225',
            'sell_price' => 'nullable|string|max:225',
            'date' => 'nullable|date',
            'time' => 'nullable|date_format:H:i:s',
            'scraped_at' => 'nullable|date',
        ]);

        $goldPrice->update($validated);
        return response()->json($goldPrice, 200);
    }

    // Xóa 1 bản ghi
    public function destroy($id)
    {
        $goldPrice = GoldPrice::find($id);
        if (!$goldPrice) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $goldPrice->delete();
        return response()->json(['message' => 'Deleted'], 200);
    }
}
