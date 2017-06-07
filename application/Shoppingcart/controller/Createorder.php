<?php
namespace app\Shoppingcart\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\DeliveryAddress;
use app\Common\Logic\ShoppingCart;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Createorder extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getAddress(){
        return (new DeliveryAddress())->getAddress($_SESSION['user_id']);
    }
    public function addAddress(){
        return (new DatabaseResponse(
            (new DeliveryAddress())->addAddress($_SESSION['user_id'], $_POST['receiver'], $_POST['address'], $_POST['zip_code'], $_POST['tel'], $_POST['is_default'], '')
            , '添加成功', '添加失败'))->out();
    }
    public function updateAddress(){
        return (new DatabaseResponse(
            (new DeliveryAddress())->updateAddress($_POST['id'], $_POST['receiver'], $_POST['address'], $_POST['zip_code'], $_POST['tel'], $_POST['is_default'], '')
            , '修改成功', '修改失败'))->out();
    }
    public function getNewOrderBooks(){
        return (new ShoppingCart())->getNewOrderShoppingCart($_SESSION['user_id']);
    }
    public function readyPayOrder(){
        return (new DatabaseResponse(
            (new ShoppingCart())->readyPay($_SESSION['user_id'], $_POST['delivery_address_id'], $_POST['pay_type'])
            , '支付成功', '支付失败'))->out();
    }
}