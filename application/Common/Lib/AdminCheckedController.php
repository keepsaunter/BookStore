<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/15
 * Time: 11:35
 */

namespace app\Common\Lib;
use think\Controller;

class AdminCheckedController extends Controller
{
    protected $beforeActionList = ['checkUserId'=> ['only'=>'index'] ];
    public function checkUserId(){
        session_start();
        if(!isset($_COOKIE['admin_user_id']) || $_COOKIE['admin_user_id'] == '' || !isset($_SESSION['admin_user_id']) || $_SESSION['admin_user_id'] == '' || ($_SESSION['admin_user_id'] != $_COOKIE['admin_user_id'])){
            if(request()->method() == 'GET'){
                $this->redirect('admin/index/index');
            }
        }
    }
}