<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/5
 * Time: 11:38
 */

namespace app\Common\Logic;
use app\Common\Model;
use think\Db;

class Resource extends MyModel
{
    public function __construct($data = [])
    {
        parent::__construct($data);
    }
    public function __constructDefault($data){
        $this->model = new Model\Resource($data);
    }

    public function add($value, $type){
        return $this->model->insertGetId(['value' => $value, 'type' => $type]);
    }
    static function getResourceValue($id){
        return Db::table('resource')->where('id', $id)->value('value');
    }
}