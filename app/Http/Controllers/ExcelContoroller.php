<?php

namespace App\Http\Controllers;

use App\Imports\ImportStore;
use App\Exports\ExportStore;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Store;
use Exception;

class ExcelContoroller extends Controller
{
  public function excelToData(Request $request)
  {

    try {
      ini_set('memory_limit','2000M');
      ini_set('upload_max_filesize', '30M');

      $temp = $request->file('excelFile')->store('temp');


      $path = storage_path('app') . '/' . $temp;

      $excelArray = Excel::toArray(new ImportStore, $path)[0];


      array_shift($excelArray);
      $inputCount = 0;

      foreach ($excelArray as $excelRow) {

        $inputCount++;
        $storeInputData[] =
          [
            "business_number" => $excelRow[0] ?? null,
            "franchise_name" => $excelRow[1] ?? null,
            "franchise_number" => $excelRow[2] ?? null,
            "industry_code" => $excelRow[3] ?? null,
            "industry_name" => $excelRow[4] ?? null,
            "market_code" => $excelRow[5] ?? null,
            "market_name" => $excelRow[6] ?? null,
            "addres_code" => $excelRow[7] ?? null,
            "addres" => $excelRow[8] ?? null,
            "addres_depth_detail" => $excelRow[9] ?? null,
            "addres_depth_1" => $excelRow[10] ?? null,
            "addres_depth_2" => $excelRow[11] ?? null,
            "emoji_code" => $excelRow[12] ?? null,
            "latitude" => $excelRow[13] ?? null,
            "longitude" => $excelRow[14] ?? null,
          ];


        if($inputCount == 1000){
          // dd($storeInputData);
          Store::insert($storeInputData);
          $inputCount = 0;
          $storeInputData = array();
        }
      }

      Store::insert($storeInputData);

      return redirect()->route('management.mian');
    } catch (Exception $e) {

    }
  }

  public function dataToExcel(Request $request)
  {
    ini_set('memory_limit','2000M');
    ini_set('upload_max_filesize', '30M');

    $requestArray =[
      'search_depth_1' => $request->input('search_depth_1') ?? null,
      'search_depth_2' => $request->input('search_depth_2') ?? null,
      'search_type' => $request->input("search_type") ?? null,
      'search_keyword' => $request->input('search_keyword') ?? null,
      'search_latLng' => $request->input('search_latLng') ?? null,
    ];

    $xlsxTitle = "onnuri_".date("ymdHis");

    return Excel::download(new ExportStore($requestArray), $xlsxTitle.'.xlsx');
  }
}
