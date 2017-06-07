<?php
namespace app\Personal\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Lib\Response;
use app\Common\Logic\User;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Changetel extends CheckedController
{
    public function index(){
        $get_message_code_time = -1;
        if(!isset($_SESSION)){
            session_start();
        }

        if(isset($_SESSION['get_message_code_time'])){
            $get_message_code_time = 120 - (strtotime(date('Y-m-d H:i:s')) - strtotime($_SESSION['get_message_code_time']));
        }
        if($get_message_code_time < 0){
            $get_message_code_time = 0;
        }
        return $this->fetch("index", ['get_message_code_time'=>$get_message_code_time]);
    }
    public function bindTel(){
        if(!isset($_SESSION)){
            session_start();
        }
        if($_POST['message_confirm'] == $_SESSION['mobile_code']){
            return (new DatabaseResponse((new User([]))->bindTel($_SESSION['user_id'], $_POST['tel']), '绑定成功', '绑定失败'))->out();
        }else{
            return (new Response('error', null, '验证码错误'))->out();
        }
    }
}