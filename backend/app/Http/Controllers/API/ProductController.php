<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'product' => $products
        ]);
    }

    public function edit($id)
    {
        $category = Product::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Category Not Found'
            ]);
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:225',
            'slug' => 'required|max:225',
            'name' => 'required|max:225',
            'pengarang' => 'required|max:20',
            'penerbit' => 'required|max:20',
            'qty' => 'required|max:4',
            // 'image' => 'mimes:jpeg,png,jpg|required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors()
            ]);
        } else {

            $product = new Product();
            $product->category_id = $request->input('category_id');
            $product->slug = $request->input('slug');
            $product->name = $request->input('name');
            $product->description = $request->input('description');

            $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_descrip = $request->input('meta_descrip');

            $product->pengarang = $request->input('pengarang');
            $product->penerbit = $request->input('penerbit');
            $product->qty = $request->input('qty');

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/' . $filename;
            }

            $product->available = $request->input('available') == true ? '1' : '0';
            $product->rented = $request->input('rented') == true ? '1' : '0';
            $product->broken = $request->input('broken') == true ? '1' : '0';
            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Book Added Successfully !'
            ]);
        }

        $product = new Product();
    }
}
