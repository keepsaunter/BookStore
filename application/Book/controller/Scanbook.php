<?php
namespace app\Book\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\Book;
use app\Common\Logic\Classify;
use app\Common\Logic\Collect;
use app\Common\Logic\ShoppingCart;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Scanbook extends CheckedController
{
    protected $beforeActionList = ['checkUserId'=> ['only'=>'addshoppingcart,addcollect'] ];
    public function index(){
        return $this->fetch('index', ["classification_id"=>$_GET['cid']]);
    }
    public function getDirectClassify(){
        $id = $_POST['id'];
        $classify_model = new Classify(['id'=>$id]);
        $data['data'] = $classify_model->getDirectChild();
        $data['name'] = $classify_model->getClassiWithParent($id);
        return $data;
    }
    public function getBooks(){
        return ((new Book())->getBooks($_POST['search_name_value'],$_POST['search_author_value'],$_POST['search_classification_id'], $_POST['order_by'], $_POST['page_now'], $_POST['page_length'], ['id','img_id','name','author','price','count_buy','comment_level']));
    }
    public function addShoppingCart(){
        $book_id = $_POST['book_id'];
        return (new DatabaseResponse((new ShoppingCart())->addBook($_SESSION['user_id'], $book_id), '添加成功', '添加失败'))->out();
    }
    public function addCollect(){
        return (new DatabaseResponse((new Collect())->addCollect($_SESSION['user_id'], $_POST['book_id'], $_POST['price']), '操作成功', '操作失败'))->out();
    }
}