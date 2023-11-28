<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use app\models\PweFile;
use Illuminate\Support\Facades\DB;
use app\Http\Controllers\ContentsPlanetException;

class OnnuriController extends Controller
{

  private $pageLimit = 10;

  public function contecFileIcon($extension): array
  {
    return
      [
        "color" => match ($extension) {
          "jpg", "jpeg", "png", "gif" => "FF7F50",
          "xlsx", "xlsm", "xlsb", "xltx" => "008C8C",
          "ppt", "pps" => "B90000",
          "csv" => "942894",
          "doc", "docm", "docx", "docx", "txt" => "0078FF",
          "pdf" => "FF0000",
          default => "828282",
        },
        "class" => match ($extension) {
          "jpg", "jpeg", "png", "gif" => "fa-file-image",
          "xlsx", "xlsm", "xlsb", "xltx" => "fa-file-excel",
          "ppt", "pps" => "fa-file-powerpoint",
          "csv" => "fa-file-csv",
          "doc", "docm", "docx", "docx", "txt" => "fa-file-word",
          "pdf" => "fa-file-pdf",
          default => "fa-file",
        },
      ];
  }

  /**
   * @deprecated
   */
  public function cpFileDownload(Request $request)
  {
    return Storage::download($request->file);
  }

  /**
   * @deprecated
   */
  public function cpFileDelete(Request $request)
  {
    return Storage::delete($request->file);
  }

  /**
   * @brief 공통 페이징
   * @author oley
   * @param Model $model
   * @param int $listNum
   * @return string
   *
   */
  public function pagaNation($model, $listNum): string
  {
    $queryString = explode("?", request()->fullUrlWithOutQuery("page"))[1] ?? "";
    $page = $model->paginate($listNum)->currentPage();
    $prePagePath = $model->paginate($listNum)->previousPageUrl();
    $pagePath = $model->paginate($listNum)->url($page);
    $nextPagePath = $model->paginate($listNum)->nextPageUrl();
    $lastPage = $model->paginate($listNum)->lastPage();

    $page_nation = "<ul class='pagination mb-2'>";

    if ($page > 3) {
      $page_nation .= "<li class='page-item'><a href='" . $model->paginate($listNum)->url(1) . "&" . $queryString . "' class='page-link'>1</a></li>";
    }

    if ($page > 1) {
      $page_nation .= "<li class='page-item'><a href='" . $prePagePath . "&" . $queryString . "' class='page-link'>«</a></li>";
    } else {
      $page_nation .= "<li class='page-item disabled'><a href='#' class='page-link'>«</a></li>";
    }

    for ($i = $page - 2; $i <= $page - 1; $i++) {
      if ($i > 0) {
        $page_nation .= "<li class='page-item'><a href='" . $model->paginate($listNum)->url($i) . "&" . $queryString . "' class='page-link'>" . $i . "</a></li>";
      }
    }

    $page_nation .= "<li class='page-item active'><a href='" . $pagePath . "&" . $queryString . "' class='page-link'>" . $page . "</a></li>";

    for ($i = $page + 1; $i <= $page + 2; $i++) {
      if ($i <= $lastPage) {
        $page_nation .= "<li class='page-item'><a href='" . $model->paginate($listNum)->url($i) . "&" . $queryString . "' class='page-link'>" . $i . "</a></li>";
      }
    }

    if ($page < $lastPage) {
      $page_nation .= "<li class='page-item'><a href='" . $nextPagePath . "&" . $queryString . "' class='page-link'>»</a></li>";
    } else {
      $page_nation .= "<li class='page-item disabled'><a href='' class='page-link'>»</a></li>";
    }

    if (($lastPage - $page) > 2) {
      $page_nation .= "<li class='page-item'><a href='" . $model->paginate($listNum)->url($lastPage) . "&" . $queryString . "' class='page-link'>" . $lastPage . "</a></li>";
    }

    $page_nation .= "</ul>";
    return ($model->paginate($listNum)->total() < $listNum) ? "" : $page_nation;
  }

  /**
   * query 확인 함수
   * @author oley
   * @param Model $modelQuery
   * @return void
   */
  public function getQuery($modelQuery): void
  {
    DB::enableQueryLog();
    $modelQuery->get();
    dd(DB::getQueryLog());
  }

  /**
   * 리스트 row Number 계산식
   * @author oley
   * @access public
   * @param int $total
   * @param int $page
   * @param int $limitNum
   * @return int
   */
  public function getPageRowNumber(int $total, int $page, int $limitNum): int
  {
    return ((int)$total - (((int)$page - 1)) * (int)$limitNum);
  }

  /**
   * 리스트 페이지 갯수 불러오기
   * @return int
   */
  public function getPageLimit(): int
  {
    return $this->pageLimit;
  }

  /**
   * 리스트 페이지 갯수 셋팅
   * @param int
   * @return void
   */
  public function setPageLimit(int $page)
  {
    $this->pageLimit = $page;
  }

  /**
   * 지난 시간 구하기
   * @param $date
   * @return string
   */
  public function getDateDiff($date)
  {

    $diff = time() - strtotime($date);

    $s = 60; //1분 = 60초
    $h = $s * 60; //1시간 = 60분
    $d = $h * 24; //1일 = 24시간
    $y = $d * 30; //1달 = 30일 기준
    $a = $y * 12; //1년

    if ($diff < $s) {
      $result = $diff . '초전';
    } elseif ($h > $diff && $diff >= $s) {
      $result = round($diff / $s) . '분전';
    } elseif ($d > $diff && $diff >= $h) {
      $result = round($diff / $h) . '시간전';
    } elseif ($y > $diff && $diff >= $d) {
      $result = round($diff / $d) . '일전';
    } elseif ($a > $diff && $diff >= $y) {
      $result = round($diff / $y) . '달전';
    } else {
      $result = round($diff / $a) . '년전';
    }

    return $result;
  }
}
