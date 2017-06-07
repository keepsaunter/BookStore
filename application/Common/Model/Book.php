<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/8
 * Time: 15:13
 */

namespace app\Common\Model;


use think\Model;

class Book extends Model
{
    protected $table = 'book';
    protected $auto = ['add_datetime', 'name'];
    public function getTableName(){
        return $this->table;
    }

    protected function setAddDatetimeAttr(){
        return date('Y-m-d H:i:s');
    }
    protected function setPrintDateAttr($value){
        return date('Y-m-d',strtotime($value));
    }
}