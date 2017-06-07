<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/8
 * Time: 22:20
 */

namespace app\Admin\controller;
use app\Common\Lib\AdminCheckedController;
use app\Common\Lib\Response;
use app\Common\Logic\Book;
use app\Common\Logic\Classify;

class Scanbook extends AdminCheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getBooks(){
        return ((new Book())->getBooks($_POST['search_name_value'],$_POST['search_author_value'],$_POST['search_classification_id'], $_POST['order_by'], $_POST['page_now'], $_POST['page_length']));
    }
    public function test(){
        var_dump((new Classify([]))->formatClassification(13));
    }
    public function editBookPrice(){
        $res = ((new Book())->savePrice($_POST['id'], $_POST['value']));
        if($res !== false){
            return (new Response('success', $res, '修改成功！'))->out();
        }else{
            return (new Response('error', $res, '修改失败！'))->out();
        }
    }
    public function editBookStock(){
        $res = ((new Book())->saveStock($_POST['id'], $_POST['value']));
        if($res !== false){
            return (new Response('success', $res, '修改成功！'))->out();
        }else{
            return (new Response('error', $res, '修改失败！'))->out();
        }
    }
    public function deleteBook(){
        $res = (new Book())->delete($_GET['id']);
        if($res !== false){
            return (new Response('success', $res, '操作成功！'))->out();
        }else{
            return (new Response('error', $res, '操作失败！'))->out();
        }
    }
}