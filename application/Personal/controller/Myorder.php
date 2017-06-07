<?php
namespace app\Personal\controller;
use app\Common\Lib\CheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Lib\Response;
use app\Common\Logic\Comment;
use app\Common\Logic\CommentTag;
use app\Common\Logic\Order;

/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/10
 * Time: 17:54
 */
class Myorder extends CheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getOrders(){
        $res = (new Order())->getAll($_SESSION['user_id'], $_POST['page_now'], $_POST['page_length'], $_POST['status_filter']);
        $res['comment_tags'] = (new CommentTag())->getTags();
        return $res;
    }
    public function deleteOrder(){
        $res = (new Order())->deleteOrder($_POST['order_id']);
        if($res === 0){
            return (new Response('error', null, '只能删除成功了的订单！'))->out();
        }else{
            return (new DatabaseResponse($res, '删除成功', '删除失败'))->out();
        }
    }
    public function commentBook(){
        return (new DatabaseResponse((new Comment())->addComment($_SESSION['user_id'], $_POST['book_id'], $_POST['level'],$_POST['content'],$_POST['tag'], request()->file('comment_img')), '发表成功','发表失败'))->out();
    }
    public function applyRejected(){
        return (new DatabaseResponse((new Order())->applyRejectedHandle($_POST['order_id']), '申请成功', '申请失败'))->out();
    }
    public function receiveOrder(){
        return (new DatabaseResponse((new Order())->receiveOrder($_POST['order_id']), '收货成功', '收货失败'))->out();
    }
}