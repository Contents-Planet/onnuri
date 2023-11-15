<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request){

        $data = [];
        return view('store.main')->with($data);
    }

    public function list(Request $request){

        $data = [];
        return view('store.list')->with($data);
    }
}
