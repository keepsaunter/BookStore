<?php
namespace app\Common\Lib;
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/4/20
 * Time: 15:53
 */
class Response
{
    protected $status;
    protected $data;
    protected $info;

    function __construct($status, $data = null, $info = null)
    {
        $this->status = config($status);
        $this->data = $data;
        $this->info = $info;
    }
    function out(){
        return array(
            'status'    =>  $this->status,
            'data'    =>  $this->data,
            'info'    =>  $this->info,
        );
    }
}