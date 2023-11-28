<?php

namespace App\Imports;

use App\Models\Store;
use Maatwebsite\Excel\Concerns\ToModel;

class ImportStore implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Store([
            //
        ]);
    }

    public function array(array $array)
    {
    	return $array;
    }

    public function headingRow(): int
    {
        return 1;
    }
}
