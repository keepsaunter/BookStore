<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/6
 * Time: 17:53
 */

namespace app\Common\Model;
use think\Model;

class Classify extends Model
{
    protected $table = 'classify';
    public function getTableName(){
        return $this->table;
    }
}