<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\Store;

class ManageMentController extends OnnuriController
{


  /**
   * @author oley
   * @param Request $request
   * @return \Illuminate\View\View
   */
  public function index(Request $request): View
  {
    $this->setPageLimit(20);
    $limitPage = $this->getPageLimit();

    $page = $request->get('page') ?? 1;

    $store_data = Store::whereNotNull('business_number');

    if (!empty($request->input("search_depth_1"))) {
      $store_data->where("addres_code", $request->input("search_depth_1"));
    }

    if (!empty($request->input("search_depth_2"))) {
      $store_data->where("addres_depth_2", $request->input("search_depth_2"));
    }

    if (!empty($request->input("search_type")) && !empty($request->input("search_keyword"))) {
      $store_data->where($request->input("search_type"), "LIKE", '%' . $request->input("search_keyword") . '%');
    }

    $store_data->limit($limitPage)->orderBy('seq', 'desc');
    // $this->getQuery($store_data);
    $depth2City = 'city_name.depth2.' . $request->input("search_depth_1") . '' ?? null;

    $data = [
      "addres_depth_1" => config("city_name.depth1"),
      "search_depth_1" => $request->input("search_depth_1") ?? null,
      "search_depth_2" => $request->input("search_depth_2") ?? null,
      "search_depth_options" => config($depth2City) ?? null,
      "search_type" => $request->input("search_type") ?? null,
      "search_keyword" => $request->input("search_keyword") ?? null,
      "store_data" => $store_data,
      "row_num" => $this->getPageRowNumber($store_data->count(), $page, $limitPage) ?? null,
      "paga_nation" => $this->pagaNation($store_data, $limitPage),
    ];

    return view('management.main')->with($data);
  }

  public function searchSecondDepth(Request $request)
  {
    $depth2City = 'city_name.depth2.' . $request->input('seq') . '';
    $return_data = config($depth2City);

    $html = "<option value=''>select</option>";
    foreach ($return_data as $val) {
      $html .= "<option value='" . $val['dec'] . "'>" . $val['dec'] . "</option>";
    }

    return $html;
  }

  public function detail(Request $request)
  {
    $store_data = Store::find($request->seq)->first();
    $depth2City = 'city_name.depth2.' . $store_data['addres_code'] . '' ?? null;

    $data = [
      "addres_depth" => config("city_name.depth1"),
      "addres_depth_1" => $store_data['addres_code'] ?? null,
      "addres_depth_2" => $store_data['addres_depth_2'] ?? null,
      "search_depth_options" => config($depth2City) ?? null,
      "store_data" => $store_data,
    ];
    return view('management.store.detail')->with($data);
  }
}
