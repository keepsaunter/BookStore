<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/13
 * Time: 20:25
 */

namespace app\Common\Logic;
use app\Common\Model;
use think\Db;


class ShoppingCart extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\ShoppingCart($data);
    }
    public function getShoppingCart($user_id, $page, $page_length){
        $shopping_cart = Db::table('shopping_cart')->where('user_id', $user_id)->page($page, $page_length)->select();
        for ($i=0; $i < count($shopping_cart); $i++){
            $shopping_cart[$i] = $this->formatShoppingCart($shopping_cart[$i]);
        }
        $res['data'] = $shopping_cart;
        $res['total_count'] = Db::table('shopping_cart')->where('user_id', $user_id)->count();
        return $res;
    }
    public function getNewOrderShoppingCart($user_id){
        $shopping_cart = Db::table('shopping_cart')->where(['user_id'=>$user_id, 'status'=> 1])->select();
        for ($i=0; $i < count($shopping_cart); $i++){
            $shopping_cart[$i] = $this->formatShoppingCart($shopping_cart[$i]);
        }
        return $shopping_cart;
    }
    public function formatShoppingCart($shopping_cart){
        if(array_key_exists('book_id', $shopping_cart)){
            $shopping_cart = array_merge($shopping_cart , (new Book())->getBook($shopping_cart['book_id'], ['id', 'img_id', 'name', 'price as real_price', 'stock']));
            $shopping_cart['real_total_price'] = $shopping_cart['count'] * $shopping_cart['real_price'];
            $shopping_cart['total_price'] = $shopping_cart['count'] * $shopping_cart['price'];
        }
        return $shopping_cart;
    }
    public function updateBookCount($user_id, $book_id, $count){
        return Db::table('shopping_cart')->where(['user_id'=>$user_id, 'book_id'=>$book_id])->setField('count', $count);
    }
    public function delete($user_id, $book_id){
        if(is_array($book_id)){
            return Db::table('shopping_cart')->where('user_id', $user_id)->where('book_id', 'in', $book_id)->delete();
        }else{
            return Db::table('shopping_cart')->where('user_id', $user_id)->where('book_id', $book_id)->delete();
        }
    }
    public function searchShoppingCart($user_id, $book_id){
        return Db::table('shopping_cart')->where('user_id', $user_id)->where('book_id', $book_id)->find();
    }
    public function addBook($user_id, $book_id, $count = 1){
        $shoppingcart_search = $this->searchShoppingCart($user_id, $book_id);
        if($shoppingcart_search != null){
            return Db::table('shopping_cart')->where('user_id', $user_id)->where('book_id', $book_id)->setInc('count', $count);
        }else{
            $price = (new Book())->getBook($book_id, 'price');
            $data = ['user_id'=>$user_id, 'book_id'=>$book_id, 'price'=>$price, 'count'=> $count, 'add_time'=>date('Y-m-d H:i:s')];
            return Db::table('shopping_cart')->insertGetId($data);
        }
    }
    public function readyPay($user_id, $delivery_address_id, $pay_type){
        $delivery_address = (new DeliveryAddress())->getDliveryAddress($delivery_address_id);
        $checked_shoppingCart = $this->getNewOrderShoppingCart($user_id);
        $time = date('Y-m-d H:i:s');
        Db::startTrans();
        /*order表*/
        $order_data = [
            'order_identify'=> date('YmdHis').(round(rand(), 3)*1000),
            'user_id' => $user_id,
            'pay_user_id' => $user_id,
            'receiver_name'=> $delivery_address['receiver'],
            'receiver_address' => $delivery_address['address'],
            'receiver_zip_code' => $delivery_address['zip_code'],
            'receiver_tel' => $delivery_address['tel'],
            'receiver_area' => $delivery_address['area'],
            'total_price' => array_sum(array_column($checked_shoppingCart, 'real_total_price')),
            'add_time' => $time,
            'pay_type' => $pay_type,
            'pay_time' => $time,
            'status' => config('order_status_paid'),
        ];
        $order_id = Db::table('order')->insertGetId($order_data);
        /*order_book表*/
        $order_book_data = [];
        $book_id_data = [];
        foreach ($checked_shoppingCart as $key => $val){
            $book_id_data[] = $val['book_id'];
            $order_book_data[] = [
                'order_id'=> $order_id,
                'book_id' => $val['book_id'],
                'price' => $val['real_price'],
                'count' => $val['count'],
            ];
        }
        $res_order_book = Db::table('order_book')->insertAll($order_book_data);
        /*book表*/
        Db::table('book')->where('id', 'in', $book_id_data)->setInc('count_buy');
        $res_book = Db::table('book')->where('id', 'in', $book_id_data)->setDec('stock');
        /*shopping_cart表*/
        $res_shopping_cart = Db::table('shopping_cart')->where('user_id', $user_id)->where('status', 1)->delete();

        if($order_id !== false && $res_order_book !== false && $res_book !== false && $res_shopping_cart !== false){
            Db::commit();
            return $order_id;
        }else{
            Db::rollback();
            return false;
        }
    }
    public function balance($user_id, $book_ids){
        Db::table('shopping_cart')->where('user_id', $user_id)->where('status', 1)->setField('status', 0);
        return Db::table('shopping_cart')->where('user_id', $user_id)->where('book_id', 'in', $book_ids)->setField('status', 1);
    }
}