<?php

namespace App\Exports;

use App\Models\Store;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;


class ExportStore implements FromCollection
{
  protected $request = '';

  public function __construct($request)
  {
    $this->request = $request;
  }

  /**
   * @return \Illuminate\Support\Collection
   */
  public function collection()
  {

    $store_data = Store::select(
                                "business_number",
                                "franchise_name",
                                "franchise_number",
                                "industry_code",
                                "industry_name",
                                "market_code",
                                "market_name",
                                "addres_code",
                                "addres",
                                "addres_depth_detail",
                                "addres_depth_1",
                                "addres_depth_2",
                                "emoji_code",
                              )->whereNotNull('business_number');

    if (!empty($this->request["search_depth_1"])) {
      $store_data->where("addres_code", $this->request["search_depth_1"]);
    }

    if (!empty($this->request["search_depth_2"])) {
      $store_data->where("addres_depth_2", $this->request["search_depth_2"]);
    }

    if (!empty($this->request["search_type"]) && !empty($this->request["search_keyword"]) ) {
      $store_data->where($this->request["search_type"],"LIKE",'%'.$this->request["search_keyword"].'%');
    }

    return $store_data->get();
  }

  public function headings(): array
  {
    return [
      "사업자 번호",
      "온누리가맹점명",
      "온누리가맹점번호",
      "BC업종코드",
      "BC업종명",
      "시장코드",
      "시장명",
      "주소코드",
      "(BC가맹점)동이상주소",
      "(BC가맹점)동이하주소",
      "시 / 도",
      "구 / 군",
      "emoji_code"
    ];
  }

  public function styles(Worksheet $sheet)
  {
    $sheet->getStyle('A1:AA1')->getFont()->setBold(true);
  }
}
