<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/13
 * Time: 23:16
 */

namespace app\Common\Lib;


class DatabaseResponse extends Response
{
    function __construct($res, $success_info, $error_info)
    {
        if($res !== false){
            parent::__construct('success', $res, $success_info);
        }else{
            parent::__construct('error', $res, $error_info);
        }
    }
}