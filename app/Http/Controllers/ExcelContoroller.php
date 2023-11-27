<?php

namespace App\Http\Controllers;

use App\Imports\ImportStore;
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
      $temp = $request->file('excelFile')->store('temp');
      $path = storage_path('app') . '/' . $temp;

      $excelArray = Excel::toArray(new ImportStore, $path)[0];
      array_shift($excelArray);

      foreach ($excelArray as $excelRow) {
        Store::updateOrCreate(
          [
            "business_number" => $excelRow[0]
          ],
          [
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
          ]
        );
      }
      return redirect()->route('management.mian');
    } catch (Exception $e) {

    }
  }

  public function loadingView()
  {
  }
}
