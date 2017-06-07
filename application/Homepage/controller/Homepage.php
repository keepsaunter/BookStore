<?php
namespace app\Homepage\controller;
use app\Common\Logic\AdvertImg;
use app\Common\Logic\Book;
use app\Common\Logic\Classify;
use think\Controller;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Homepage extends Controller
{
    public function index(){
        return $this->fetch('index');
    }
    public function getDirectClassify(){
        return (new Classify(['id'=>0]))->getDirectGrandsonChild();
    }
    public function getNewBooks(){
        return ((new Book())->getBooks('','','', 'add_datetime desc', $_GET['page_now'], $_GET['page_length'], ['id','img_id','name','author','price']));
    }
    public function getBookRank(){
        return ((new Book())->getBooks('','','', 'count_buy desc', $_GET['page_now'], $_GET['page_length'], ['id','img_id','name','author','price']));
    }
    public function getAdvertImage(){
        return (new AdvertImg())->getAdvertImg(1);
    }
}