<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/12
 * Time: 23:16
 */

namespace app\Book\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\Book;
use app\Common\Logic\CommentTag;
use app\Common\Logic\ShoppingCart;
use think\Controller;

class BookDetail extends CheckedController
{
    protected $beforeActionList = ['checkUserId'=> ['only'=>'addshoppingcart'] ];
    public function index(){
        return $this->fetch('index', ['book_id'=> $_GET['book_id']]);
    }
    public function getBookDetail(){
        $id = $_GET['id'];
        return (new Book())->getBook($id);
    }
    public function getComment(){
        return (new Book())->getComment($_POST['book_id'], $_POST['page_now'], $_POST['page_length'], $_POST['tags']);
    }
    public function getTags(){
        return (new CommentTag())->getTags();
    }
    public function addShoppingCart(){
        return (new DatabaseResponse((new ShoppingCart())->addBook($_SESSION['user_id'], $_POST['book_id'], $_POST['count']), '添加成功', '添加失败'))->out();
    }
}