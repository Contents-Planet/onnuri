<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class MapController extends Controller
{
    public function findAddres(Request $request){

        $response = Http::asForm()->post('https://api.naver.com/v3/map', [
            'token' => '',
        ]);
    }

}
