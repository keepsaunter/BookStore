<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/8
 * Time: 22:20
 */

namespace app\Admin\controller;
use app\Common\Lib\AdminCheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\Order;

class Scanorder extends AdminCheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getOrder(){
        return (new Order())->adminGetAll($_POST['page_now'], $_POST['page_length'], $_POST['status_filter'], $_POST['search_value'], $_POST['order_by']);
    }
    public function deleteOrder(){
        return (new DatabaseResponse((new Order())->deleteOrder($_POST['order_id']), '删除成功', '操作失败'))->out();
    }
    public function dealRejectedOrder(){
        return (new DatabaseResponse((new Order())->dealRejected($_POST['order_id'], $_POST['is_agree']), '同意申请成功', '拒绝申请失败'))->out();
    }
    public function deliverOrder(){
        return (new DatabaseResponse((new Order())->deliverOrder($_POST['order_id']), '发货成功', '发货失败'))->out();
    }
}