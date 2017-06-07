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

class OrderBook extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\OrderBook($data);
    }
    public function getOrderBooks($order_id){
        $books = Db::table('order_book')->where('order_id', $order_id)->select();
        for($i=0; $i<count($books); $i++){
            $books[$i] = $this->formatBooks($books[$i]);
        }
        return $books;
    }
    public function formatBooks($book){
        if(array_key_exists('book_id', $book)){
            $book = array_merge($book , (new Book())->getBook($book['book_id'], ['img_id', 'name']));
            $book['total_price'] = $book['count'] * $book['price'];
        }
        return $book;
    }
    public function deleteOrderBooks($order_id){
        return Db::table('order_book')->where('order_id', $order_id)->delete();
    }
}