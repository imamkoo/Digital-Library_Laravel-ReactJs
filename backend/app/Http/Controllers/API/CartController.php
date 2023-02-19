<?php

namespace App\Http\Controllers\API;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    public function addtocart(Request $request)
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck) {

                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()) {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name . 'Already Added '
                    ]);
                } else {
                    $cartitem = new Cart;
                    $cartitem->user_id = $user_id;
                    $cartitem->product_id = $product_id;
                    $cartitem->product_qty = $product_qty;

                    return response()->json([
                        'status' => 201,
                        'message' => 'Added to chart'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'product not found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Login to add chart'
            ]);
        }
    }

    public function viewcart()
    {
        if (auth('sanctum')->check()) {

            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('user_id', $user_id)->get();

            return response()->json([
                'status' => 200,
                'cart' => $cartitem
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to view chart'
            ]);
        }
    }

    public function updatequantity($cart_id, $scope)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            if ($scope == 'inc') {
                $cartitem->product_qty += 1;
            } else if ($scope == 'dex') {
                $cartitem->product_qty -= 1;
            }
            $cartitem->update();
            return response()->json([
                'status' => 200,
                'message' => 'Quantity Update'
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ]);
        }
    }

    public function deleteCartitem($cart_id)
    {
        if (auth('sanctum')->check()) {
            $user_id = auth('sanctum')->user()->id;
            $cartitem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

            if ($cartitem) {
                $cartitem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Item Removed !'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Item Not Found'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to continue'
            ]);
        }
    }
}
