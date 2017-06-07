<?php
namespace app\Book\controller;
use app\Common\Logic\Book;
use think\Controller;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Searchbook extends Controller
{
    public function index(){
        return $this->fetch('index', ["search_val"=>$_GET['search_val'], 'type'=>$_GET['type']]);
    }
    public function getBooks(){
        return ((new Book())->getBooks($_POST['search_name_value'],$_POST['search_author_value'],$_POST['search_classification_id'], $_POST['order_by'], $_POST['page_now'], $_POST['page_length'], ['id','img_id','name','author','price','count_buy','comment_level','introduction', 'classification_id', 'edition']));
    }
}