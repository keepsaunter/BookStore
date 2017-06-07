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

class Collect extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\Collect($data);
    }
    public function addCollect($user_id, $book_id, $price){
        if(Db::table('collect')->where('user_id', $user_id)->where('book_id', $book_id)->delete() > 0){
            return 1;
        }else{
            return Db::table('collect')->insertGetId(['user_id'=>$user_id, 'book_id'=>$book_id, 'price'=>$price, 'add_time'=>date('Y-m-d H:i:s')]);
        }
    }
    public function getCollect($user_id, $page_now, $page_lenthg){
        $res = Db::table('collect')->where('user_id', $user_id)->page($page_now, $page_lenthg)->select();
        for($i=0; $i<count($res); $i++){
            $res[$i] = array_merge($res[$i], (new Book())->getBook($res[0]['book_id'], 'img_id, price as real_price, name, introduction'));
        }
        $total_length = Db::table('collect')->where('user_id', $user_id)->count();
        return ['data'=>$res, 'total_length'=> $total_length];
    }
    public function deleteCollect($user_id, $book_id){
        return Db::table('collect')->where('user_id', $user_id)->where('book_id', $book_id)->delete();
    }
}