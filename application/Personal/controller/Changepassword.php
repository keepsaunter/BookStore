<?php
namespace app\Personal\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\Response;
use app\Common\Logic\User;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Changepassword extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function changePassword(){
        $res = (new User([]))->changePassword($_SESSION['user_id'], $_POST['pre_password'], $_POST['password']);
        if($res == 0){
            return (new Response('error', null, '设置出错！'))->out();
        }else if($res == 1){
            return (new Response('error', null, '原始密码错误！'))->out();
        }else if($res == 2){
            if(!isset($_SESSION)){
                session_start();
            }
            unset($_SESSION['user_id']);
            setcookie('user_id', '', time()-10, '/');
            setcookie('user_name', '', time()-10, '/');
            return (new Response('success', null, '设置成功！'))->out();
        }
    }
}