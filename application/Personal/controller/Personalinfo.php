<?php
namespace app\Personal\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\Response;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Personalinfo extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function logOff(){
        if(!isset($_SESSION)){
            session_start();
        }
        unset($_SESSION['user_id']);
        setcookie('user_id', '', time()-10, '/');
        setcookie('user_name', '', time()-10, '/');
        return (new Response('success', null, '注销成功', '注销失败'))->out();
    }
}