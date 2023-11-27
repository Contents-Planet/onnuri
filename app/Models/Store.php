<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Store extends Model
{
    protected $table = 'store';
    protected $primaryKey = 'seq';


    const CREATED_AT = null;
    const UPDATED_AT = null;


    protected $fillable = [
      "business_number",
      "franchise_name",
      "franchise_number",
      "industry_code",
      "industry_name",
      "market_code",
      "market_name",
      "addres_code",
      "addres",
      "addres_depth_1",
      "addres_depth_2",
      "addres_depth_detail",
      "emoji_code",
    ];

}
