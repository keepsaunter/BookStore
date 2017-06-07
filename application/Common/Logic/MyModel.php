<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/4/21
 * Time: 10:38
 */

namespace app\Common\Logic;


class MyModel
{
    protected $model;
    public function __constructModel($data){
        $this->model = $data;
    }
    public function __constructDefault($data){
    }
    public function __construct($data = [])
    {
        (is_array($data) || $data == null) ? $this->__call('__constructDefault', $data) : $this->__call('__constructModel', $data);
    }
    public function __call($name, $arg) //根据函数名调用函数
    {
        call_user_func_array(array($this, $name), array($arg));
    }
}