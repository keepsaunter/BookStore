<?php
namespace app\Login\controller;
use think\Controller;
use app\Common\Lib\DatabaseResponse;
use app\Common\Lib\Response;
use app\Common\Lib\HuyiSmsSend;
use app\Common\Logic\User;

class Register extends Controller
{
    public function index()
    {
        $get_message_code_time = -1;
        session_start();
        if(isset($_SESSION['get_message_code_time'])){
            $get_message_code_time = 120 - (strtotime(date('Y-m-d H:i:s')) - strtotime($_SESSION['get_message_code_time']));
        }
        if($get_message_code_time < 0){
            $get_message_code_time = 0;
        }
        return $this->fetch("register", ['get_message_code_time'=>$get_message_code_time]);
    }
    public function getMessageConfirm(){
        session_start();
        $_SESSION['get_message_code_time'] = date('Y-m-d H:i:s');
        return (new HuyiSmsSend())->confirm($_POST['tel']);
    }
    public function register(){
        if(!isset($_SESSION)){
            session_start();
        }
        if($_POST['message_confirm'] == $_SESSION['mobile_code']){
            return (new DatabaseResponse((new User([]))->addUser($_POST['name'], $_POST['tel'], $_POST['password']), '注册成功', '注册失败'))->out();
        }else{
            return (new Response('error', null, '验证码错误'))->out();
        }
    }
    public function checkUsername(){
        return (new DatabaseResponse((new User([]))->checkUsername($_POST['name']), '', '该用户名已存在'))->out();
    }
    public function checkTel(){
        return (new DatabaseResponse((new User([]))->checkTel($_POST['tel']), '','该电话号码已存在'))->out();
    }
}
