<?php
namespace app\Personal\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\Collect;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Personalcollect extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getCollected(){
        return (new Collect())->getCollect($_SESSION['user_id'], $_POST['page_now'], $_POST['page_length']);
    }
    public function deleteCollected(){
        return (new DatabaseResponse((new Collect())->deleteCollect($_SESSION['user_id'], $_POST['book_id']), '删除成功', '删除失败'))->out();
    }
}