<?php
namespace app\Personal\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Deliveryaddress extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getDeliveryAddress(){
        return (new \app\Common\Logic\DeliveryAddress())->getAddress($_SESSION['user_id']);
    }
    public function addDeliveryAddress(){
        return (new DatabaseResponse(
            (new \app\Common\Logic\DeliveryAddress())->addAddress($_SESSION['user_id'], $_POST['receiver'], $_POST['address'], $_POST['zip_code'], $_POST['tel'], $_POST['is_default'], '')
            , '添加成功', '添加失败'))->out();
    }
    public function updateDeliveryAddress(){
        return (new DatabaseResponse(
            (new \app\Common\Logic\DeliveryAddress())->updateAddress($_POST['id'], $_POST['receiver'], $_POST['address'], $_POST['zip_code'], $_POST['tel'], $_POST['is_default'], '')
            , '修改成功', '修改失败'))->out();
    }
    public function deleteDeliveryAddress(){
        return (new DatabaseResponse(
            (new \app\Common\Logic\DeliveryAddress())->deleteAddress($_POST['id'])
            , '删除成功', '删除失败'))->out();
    }
}