<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/15
 * Time: 11:28
 */

namespace app\Common\Logic;
use app\Common\Model;
use think\Db;

class Order extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\Order($data);
    }
    public function getAll($user_id = '', $page, $page_length, $status = -1){
        if($user_id != ''){
            $where = ['user_id'=>$user_id];
        }else{
            $where = [];
        }
        if($status >= 0){
            $where['status'] = $status;
        }
        $orders = Db::table('order')->where($where)->order('add_time', 'desc')->page($page, $page_length)->select();
        $order_book_Obj = new OrderBook();
        for($i=0; $i<count($orders); $i++){
            $orders[$i]['book'] = $order_book_Obj->getOrderBooks($orders[$i]['id']);
            $orders[$i]['status_info'] = $this->getStatus($orders[$i]['status']);
        }
        $total_length = Db::table('order')->where($where)->count();
        return ['data'=>$orders, 'total_length'=>$total_length];
    }
    public function adminGetAll($page, $page_length, $status = -1, $search_value='', $order_by=''){
        $query_string = "from `order` o JOIN (SELECT id user_table_id,name user_name FROM`user`) u on o.user_id=u.user_table_id where (u.user_name like'%".$search_value."%' or o.order_identify like '%".$search_value."%')";
        if($status >= 0){
            $query_string .=  " and o.STATUS = ".$status;
        }
        if($order_by != ''){
            $query_string .= ' ORDER BY '.$order_by;
        }
        $orders = Db::query('select * '.$query_string.' LIMIT '.(($page-1) * $page_length).','.$page_length);
        $orders = array_map(function($val){
            $val['pay_type_text'] = $this->getPayTypeText($val['pay_type']);
            return $val;
        }, $orders);

        $order_book_Obj = new OrderBook();
        for($i=0; $i<count($orders); $i++){
            $orders[$i]['book'] = $order_book_Obj->getOrderBooks($orders[$i]['id']);
            $orders[$i]['status_info'] = $this->getStatus($orders[$i]['status']);
        }
        $total_length = Db::query('select count(o.id) total '.$query_string);
        return ['data'=>$orders, 'total_length'=>$total_length[0]['total']];
    }
    public function getPayTypeText($pay_type){
        switch ($pay_type){
            case config('order_pay_type_alipay'): return "支付宝";break;
            default:break;
        }
    }
    public function getStatus($status){
        switch ($status){
            case config('order_status_default') : return "未支付";break;
            case config('order_status_paid') : return "已支付";break;
            case config('order_status_delivery') : return "已发货";break;
            case config('order_status_take') : return "已收货";break;
            case config('order_status_rejecting') : return "退货中";break;
            case config('order_status_rejected') : return "已退货";break;
            case config('order_status_reject_disagree') : return "退货被拒绝";break;
            default: return "";break;
        }
    }
    public function deleteOrder($order_id){
        $status = Db::table('order')->where('id', $order_id)->value('status');
        if($status == config('order_status_default') || $status == config('order_status_take') || $status == config('order_status_rejected') || $status == config('order_status_reject_disagree')){
            (new OrderBook())->deleteOrderBooks($order_id);
            return Db::table('order')->where('id', $order_id)->delete();
        }else{
            return 0;
        }
    }
    public function dealRejected($order_id, $is_agree){
        return Db::table('order')->where('id', $order_id)->setField('status', $is_agree ? config('order_status_rejected') : config('order_status_reject_disagree'));
    }
    public function deliverOrder($order_id){
        return Db::table('order')->where('id', $order_id)->setField('status', config('order_status_delivery'));
    }
    public function applyRejectedHandle($order_id){
        return Db::table('order')->where('id', $order_id)->setField('status', config('order_status_rejecting'));
    }
    public function receiveOrder($order_id){
        return Db::table('order')->where('id', $order_id)->setField('status', config('order_status_take'));
    }
}