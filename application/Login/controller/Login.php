<?php
namespace app\Login\controller;
use app\Common\Service\User;
use think\Controller;
use app\Common\Lib;

class Login extends Controller
{
    public function index()
    {
        return $this->fetch("login");
    }
    public function login(){
        $error_code = (new User())->login($_POST['userName'], $_POST['password']);
        switch ($error_code){
            case 0 : return (new Lib\Response('error', null, 'user dose not exist!please check it'))->out();break;
            case 1 : return (new Lib\Response('success', null, 'logging in!'))->out();break;
            case 2 : return (new Lib\Response('error', null, 'wrong password!please check it'))->out();break;
            default: break;
        }
    }
}
