<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;
use PHPUnit\Util\Json;

class StoreController extends Controller
{

  public function index(Request $request)
  {

    $data = [];

    return view('store.main')->with($data);
  }

  public function list(Request $request)
  {

    $data = [];
    return view('store.list')->with($data);
  }

  public function getCityNames(Request $request)
  {
    if ($request->input('depth') == "depth1") {
      $return_data = config('city_name.depth1');
    } else if ($request->input('depth') == "depth2") {
      $depth2City = 'city_name.depth2.'.$request->input('val').'';
      $return_data = config($depth2City);
    } else {
      $return_data = config("city_name.depth3");
    };

    return json_encode($return_data);
  }

  public function findStore(Request $request)
  {
    $request->addres1;
    Store::where('addres_depth_1', $request->addres1)
      ->where('addres_depth_2', $request->addres2)
      ->where('addres_depth_1', $request->addres1);
  }
}
