<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/8
 * Time: 22:20
 */

namespace app\Admin\controller;
use app\Common\Lib\Response;
use app\Common\Logic\User;
use think\Controller;

class Index extends Controller
{
    public function index(){
        return $this->fetch('index');
    }
    public function login(){
        $res = (new User([]))->adminLogin($_POST['userName'], $_POST['password']);
        if($res == 0){
            return (new Response('error', null, '管理员账户不存在'))->out();
        }else if($res == 1){
            return (new Response('error', null, '密码错误'))->out();
        }else if($res == 2){
            return (new Response('success', null, '登录成功'))->out();
        }
    }
}