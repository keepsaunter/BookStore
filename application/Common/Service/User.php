<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/4/21
 * Time: 10:04
 */

namespace app\Common\Service;
use app\Common\Model;
use app\Common\Logic;

class User
{
    /*
     * 用户登录
     */
    function login($userName, $password){
        $userModel = Model\User::get(['name' => $userName]);
        if($userModel !== null){
            if((new Logic\User($userModel))->verify($password)){
                session_start();
                $user_id = $userModel->getAttr("id");
                $_SESSION['user_id'] = $user_id;
                SetCookie("user_name", $_POST['userName'], time()+3600, '/');
                SetCookie("user_id", $user_id, time()+3600, '/');
                return 1;
            }else{
                return 2;
            }
        }else{
            return 0;
        }
    }
}