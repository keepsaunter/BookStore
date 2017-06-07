<?php
namespace app\Shoppingcart\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\ShoppingCart;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Index extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getShoppingCart(){
        return (new ShoppingCart())->getShoppingCart($_COOKIE['user_id'], $_GET['page_now'], $_GET['page_length']);
    }
    public function updateBookCount(){
        $book_id = $_POST['book_id'];
        $count = $_POST['count'];
        return (new DatabaseResponse((new ShoppingCart())->updateBookCount($_COOKIE['user_id'], $book_id, $count), '', '数据修改失败'))->out();
    }
    public function deleteShoppingCart(){
        $book_id = $_POST['book_id'];
        return (new DatabaseResponse((new ShoppingCart())->delete($_COOKIE['user_id'], $book_id), '删除成功', '删除失败'))->out();
    }
    public function balance(){
        return (new DatabaseResponse(
            (new ShoppingCart())->balance($_SESSION['user_id'], $_POST['book_ids'])
            , '', '结算失败'))->out();
    }
}