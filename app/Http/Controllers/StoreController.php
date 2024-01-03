<?php

namespace App\Http\Controllers;

use App\Exports\ExportStore;
use App\Imports\ImportStore;
use Illuminate\Http\Request;
use App\Models\Store;
use Exception;
use Maatwebsite\Excel\Excel;
use PHPUnit\Util\Json;

class StoreController extends OnnuriController
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
  public function how(Request $request)
  {
    $data = [];
    return view('how.main')->with($data);
  }

  public function getCityNames(Request $request)
  {
    if ($request->input('depth') == "depth1") {
      $return_data = config('city_name.depth1');
    } else if ($request->input('depth') == "depth2") {
      $depth2City = 'city_name.depth2.' . $request->input('val') . '';
      $return_data = config($depth2City);
    } else {
      $return_data = config("city_name.depth3");

      $stores = Store::selectRaw("industry_code,count(1) as count")
        ->where('addres_depth_1', $request->input('dec1'))
        ->where('addres_depth_2', $request->input('dec2'))
        ->groupBy('industry_code')
        ->get();

      foreach ($stores as $list) {
        $return_data[$list->industry_code]['isActive'] = "1";
        $return_data[$list->industry_code]['count'] = $list->count;
      }

      $isActive = array_column($return_data, 'isActive');
      $seq = array_column($return_data, 'seq');

      array_multisort($isActive, SORT_DESC, $seq, $return_data);
    };

    return json_encode($return_data);
  }

  public function getStoreList(Request $request)
  {

    $depth2City = 'city_name.depth2.' . $request->input('depth1') . '';
    $depth2CityArray = config($depth2City);
    $industry_code = config("city_name.industry_code");
    $depth2Index = $request->input('depth2') - 1;
    $depthDec = $depth2CityArray[$depth2Index]['dec'];
    $depth3 = $request->input('depth3');
    $page = (int)$request->input('page') ?? 1;
    $pageLimit = 10;
    $offsetNum = ($page - 1) * $pageLimit;

    $stores = Store::where("addres_code", $request->depth1)
      ->where("addres_depth_2", $depthDec)
      ->where(function ($query) use ($depth3, $industry_code) {
        for ($i = 0; $i < count($depth3); $i++) {
          $query->orWhere('industry_code', $industry_code[$depth3[$i]]);
        }
      });

    $totalCount = $stores->count();

    $stores->offset($offsetNum)->limit($pageLimit);

    $data = [];

    foreach ($stores->get() as $list) {
      $data[] = [
        "seq" => $list->seq,
        "tit" => $list->franchise_name,
        "add" => $list->addres . " " . $list->addres_depth_detail ?? '',
        "business" => $list->emoji_code,
        "market_name" => $list->market_name,
      ];
    }

    $returnArray = [
      "totalCount" => $totalCount,
      "totalPage" => ceil($totalCount / $pageLimit),
      "page" => $page,
      "listNum" => $pageLimit,
      "data" => $data,
    ];

    return json_encode($returnArray);
    // return $stores;

  }

  public function testAddres(Request $request){
    $stores = Store::whereNotNull('business_number')->where("latitude","null")
    ->offset(0)->limit(1000)->orderBy('seq','asc');

    $data = [];

    foreach ($stores->get() as $list) {
      $data[] = [
        "seq" => $list->seq,
        "business_number" => $list->business_number,
        "franchise_name" => $list->franchise_name,
        "franchise_number" => $list->franchise_number,
        "industry_code" => $list->industry_code,
        "industry_name" => $list->industry_name,
        "market_code" => $list->market_code,
        "market_name" => $list->market_name,
        "addres_code" => $list->addres_code,
        "addres" => $list->addres,
        "addres_depth_detail" => $list->addres_depth_detail,
        "emoji_code" => $list->emoji_code,
        "addres_depth_1" => $list->addres_depth_1,
        "addres_depth_2" => $list->addres_depth_2,
        "add" => $list->addres . " " . $list->addres_depth_detail ?? '',
      ];
    }

    $returnArray = [
      "data" => $data,
    ];

    return json_encode($returnArray);
  }

  public function findStore(Request $request)
  {
    exit;
    $IndustryCodes = [
      3307 => '1',
      3305 => '2',
      3101 => '3',
      2001 => '4',
      2102 => '5',
      4411 => '6',
      3099 => '7',
      4209 => '8',
      4004 => '9',
      5191 => '10',
      9301 => '11',
      7102 => '12',
      2111 => '13',
      7044 => '14',
      9210 => '15',
      2113 => '16',
      2104 => '17',
      2002 => '18',
      3309 => '19',
      4203 => '20',
      2010 => '21',
      7105 => '22',
      7121 => '23',
      2240 => '24',
      2250 => '25',
      5104 => '26',
      7112 => '27',
      9010 => '28',
      3001 => '29',
      6101 => '30',
      6110 => '31',
      8302 => '32',
      4201 => '33',
      4420 => '34',
      2112 => '35',
      7103 => '36',
      2114 => '37',
      3308 => '38',
      7110 => '39',
    ];

    $addresCodes = [
      "서울" => "1",
      "부산" => "2",
      "대구" => "3",
      "울산" => "4",
      "세종" => "5",
      "경기" => "6",
      "강원" => "7",
      "충북" => "8",
      "충남" => "9",
      "전북" => "10",
      "전남" => "11",
      "경북" => "12",
      "경남" => "13",
      "제주" => "14",
      "광주" => "15",
      "대전" => "16",
      "인천" => "17",
    ];

    $stroes = Store::all();
    set_time_limit(3000);
    foreach ($stroes as $list) {
      $addresArray = explode(' ', $list->addres);
      Store::find($list->seq)->update([
        "addres_code" => $addresCodes[$addresArray[0]] ?? null,
        "addres_depth_1" => $addresArray[0] ?? null,
        "addres_depth_2" => $addresArray[1] ?? null,
        "emoji_code" => $IndustryCodes[$list->industry_code] ?? null,
      ]);
    }
  }
}
