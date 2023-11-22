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

      $stores = Store::selectRaw("industry_code,count(1) as count")->where('addres_depth_1','서울')->where('addres_depth_2','강남구')
      ->groupBy('industry_code')
      ->get();

      foreach($stores as $list){
        $return_data[$list->industry_code]['isActive'] = "1";
        $return_data[$list->industry_code]['count'] = $list->count;
      }

    };

    return json_encode($return_data);
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
    foreach($stroes as $list){
      $addresArray = explode(' ',$list->addres );
      Store::find($list->seq)->update([
        "addres_code" => $addresCodes[$addresArray[0]] ?? null,
        "addres_depth_1" => $addresArray[0] ?? null,
        "addres_depth_2" => $addresArray[1] ?? null,
        "emoji_code" => $IndustryCodes[$list->industry_code] ?? null,
      ]);
    }


  }
}
