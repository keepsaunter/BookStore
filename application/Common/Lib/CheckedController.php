<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/15
 * Time: 11:35
 */

namespace app\Common\Lib;
use think\Controller;

class CheckedController extends Controller
{
    protected $beforeActionList = ['checkUserId', ];
    public function checkUserId(){
        session_start();
        if(!isset($_COOKIE['user_id']) || $_COOKIE['user_id'] == '' || !isset($_SESSION['user_id']) || $_SESSION['user_id'] == '' || ($_SESSION['user_id'] != $_COOKIE['user_id'])){
            if(count($_POST) == 0){
                setcookie('login_jump_url', $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'], null, '/');
            }
            if(request()->method() == 'GET'){
                $this->redirect('login/login/index');
            }else{
                header('Content-Type:application/json');
                echo json_encode(['status'=>302]);
                exit();
            }
        }
    }
}