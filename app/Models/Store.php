<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Store extends Model
{
    protected $table = 'store';
    protected $primaryKey = 'seq';

    protected $fillable = [
      "business_number",
      "franchise_name",
      "franchise_number",
      "Industry_code",
      "Industry_name",
      "market_code",
      "market_name",
      "addres_code",
      "addres_depth_1",
      "addres_depth_2",
      "addres_depth_3",
      "addres_depth_detail",
      "emoji_code",
    ];

}
