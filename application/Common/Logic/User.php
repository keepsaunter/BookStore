<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/4/21
 * Time: 9:57
 */

namespace app\Common\Logic;

use think\Db;

class User extends MyModel
{
    public function __construct($data)
    {
        parent::__construct($data);
    }
    public function adminLogin($user_name, $password){
        $db_password = Db::table('user')->where('name', $user_name)->where('type', 0)->value('password');
        if($db_password != null){
            if($db_password == $password){
                session_start();
                $admin_id = Db::table('user')->where('name', $user_name)->where('type', 0)->value('id');
                $_SESSION['admin_user_id'] = $admin_id;
                SetCookie("admin_user_name", $user_name, time()+3600, '/');
                SetCookie("admin_user_id", $admin_id, time()+3600, '/');
                return 2;
            }else{
                return 1;
            }
        }else{
            return 0;
        }
    }
    public function verify($password){
        return $this->model->getAttr('password') == $password;
    }
    public function getName($user_id){
        return Db::table('user')->where('id', $user_id)->value('name');
    }
    public function addUser($name, $tel, $password){
        return Db::table('user')->insertGetId(['name'=>$name, 'tel'=>$tel, 'password'=>$password]);
    }
    public function checkUsername($user_name){
        return (Db::table('user')->where('name', $user_name)->count()) == 0;
    }
    public function checkTel($tel){
        return (Db::table('user')->where('tel', $tel)->count()) == 0;
    }
    public function changePassword($user_id, $pre_pasword, $new_password){
        $confirm = Db::table('user')->where('id', $user_id)->value('password');
        if($confirm != false){
            if($confirm == $pre_pasword){
                Db::table('user')->where('id', $user_id)->setField('password', $new_password);
                return 2;
            }else{
                return 1;
            }
        }else{
            return 0;
        }
    }
    public function bindTel($user_id, $tel){
        return Db::table('user')->where('id', $user_id)->setField('tel', $tel);
    }
}