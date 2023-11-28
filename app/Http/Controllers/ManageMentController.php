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

    $store_data = Store::whereNotNull('business_number')->limit($limitPage)->orderBy('seq','desc');

    $data = [
      "store_data" => $store_data,
      "row_num" => $this->getPageRowNumber($store_data->count(), $page, $limitPage) ?? null,
      "paga_nation" => $this->pagaNation($store_data, $limitPage),
    ];

    return view('management.main')->with($data);
  }

}
