<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/8
 * Time: 15:13
 */

namespace app\Common\Logic;
use app\Common\Lib\ImageHandle;
use app\Common\Model;
use think\Db;

class Book extends MyModel
{
    public function __construct($data = [])
    {
        parent::__construct($data);
    }
    public function __constructDefault($data){
        $this->model = new Model\Book($data);
    }

    /**
     * @param $data:name;img_id;synopsis;catalogue;edition;print_date;classification_id;stock;price;char_count;page_count;author
     */
    public function add($data){
        return $this->model->save($data);
    }
    public function formatBookData($book_data){
        if(array_key_exists('img_id', $book_data)) {
            $path_book_cover_img = config('path_book_cover_img');
            if($book_data['img_id'] == ''){
                $book_data['img_id'] = $path_book_cover_img.config('book_cover_default_img_name');
            }
            $book_data['img_id'] = $path_book_cover_img . Resource::getResourceValue($book_data['img_id']);
        }
        if(array_key_exists('classification_id', $book_data)){
            $book_data['classification_id'] = (new Classify())->formatClassification($book_data['classification_id']);
        }
        if(array_key_exists('catalogue', $book_data)) {
            $book_data['catalogue'] = unserialize($book_data['catalogue']);
        }
        if(array_key_exists('detail_img', $book_data)) {
            $path_detail_img = config('path_book_detail_img');
            $img_data = Db::table('resource')->where('id', 'in', explode(',', $book_data['detail_img']))->column('value');

            if(count($img_data) == 0){
                $img_data = [$path_detail_img.config('book_detail_default_img_name')];
            }else{
                for ($i=0; $i<count($img_data); $i++){
                    $img_data[$i] = $path_detail_img.$img_data[$i];
                }
            }
            $book_data['detail_img'] = $img_data;
        }
        if(array_key_exists('id', $book_data)){
            $book_data['is_collected'] = 0;
            if(!isset($_SESSION)){
                session_start();
            }
            if(isset($_SESSION['user_id'])){
                if(Db::table('collect')->where('user_id', $_SESSION['user_id'])->where('book_id', $book_data['id'])->count() > 0){
                    $book_data['is_collected'] = 1;
                }
            }
        }

        return $book_data;
    }
    public function getBooks($search_name='', $search_author='', $search_classification_id='', $order_by='', $page, $length, $columns='*'){
        $search_data = 'name like "%'.$search_name.'%" && author like "%'.$search_author.'%" ';

        if($search_classification_id != ''){
            $classification_id_datas = (new Classify(['id'=>$search_classification_id]))->getDirectGrandsonChildId();
            $classification_id_datas[] = $search_classification_id;
            $search_data .=  'and classification_id in ('.join(',', $classification_id_datas).')';
        }
        $data = Db::table(($this->model)->getTableName())->where($search_data)->order($order_by)->page($page, $length)->field($columns)->select();
        $total_count = Db::table(($this->model)->getTableName())->where($search_data)->count();

        for($i = 0; $i<count($data); $i++){
            $data[$i] = $this->formatBookData($data[$i]);
        }
        return ['data' => $data, 'total_count' => $total_count];
    }
    public function savePrice($id, $value){
        return Db::table(($this->model)->getTableName())->where('id', $id)->setField('price', $value);
    }
    public function saveStock($id, $value){
        return Db::table(($this->model)->getTableName())->where('id', $id)->setField('stock', $value);
    }
    public function delete($id){
        return Db::table(($this->model)->getTableName())->delete($id);
    }
    public function getBook($id, $field='*'){
        $res = $this->formatBookData(Db::table(($this->model)->getTableName())->where('id', $id)->field($field)->find());
        $res['count_comment'] = Db::table('comment')->where('book_id', $id)->count();
        return $res;
    }
    public function getComment($book_id, $page_now, $page_length, $tags=''){
        $query_string = " FROM `comment` WHERE book_id=".$book_id;
        if($tags != ''){
            $query_string .= " and id in (SELECT DISTINCT(comment_id) FROM comment_tag_info WHERE tag_id IN (".$tags."))";
        }
        $comments = Db::query("SELECT *".$query_string." LIMIT ".(($page_now-1) * $page_length).",".$page_length);
        $comments = array_map(function($val){
            $val['img'] = Db::table('resource')->where('id', 'in', explode(',', $val['img']))->column('value');
            return $val;
        }, $comments);
        $res['data'] = $comments;
        $res['total_count'] = (Db::query("SELECT COUNT(*) as total_count".$query_string))[0]['total_count'];

        $count_good_comment = Db::query("SELECT COUNT(DISTINCT comment_id) AS count_good_comment FROM comment_tag_info WHERE tag_id IN (SELECT id FROM comment_tag WHERE type=".config('comment_tag_type_good').") AND comment_id IN (SELECT id FROM `comment` WHERE book_id=".$book_id.")")[0]['count_good_comment'];
        $count_comment = Db::query("SELECT COUNT(*) as total_count FROM `comment` WHERE book_id=".$book_id)[0]['total_count'];
        if($count_comment == 0){
            $res['good_comment_rate'] = 0;
        }else{
            $res['good_comment_rate'] = round($count_good_comment * 100 / $count_comment ,2) . '%';
        }
        return $res;
    }
    public function getDetailImage($book_id){
        $book_detail_img = Db::table('book')->where('id', $book_id)->value('detail_img');
        $res = Db::table('resource')->where('id', 'in', explode(',', $book_detail_img))->select();
        $path_detail_img = config('path_book_detail_img');
        $res = array_map(function($val) use($path_detail_img){
            $val['value'] = $path_detail_img.$val['value'];
            return $val;
        }, $res===false ? []:$res);
        return $res;
    }
    public function addDetailImage($book_id, $images){
        $image_id =[];
        $resource_type_detail = config('resource_type_detail');
        foreach ($images as $key => $val){
            $img_handle = new ImageHandle($val);
            $image_id[] = $img_handle->saveImage(config('path_book_detail_img'), $resource_type_detail);
        }
        $pre_image_id = Db::table('book')->where('id', $book_id)->value('detail_img');
        return Db::table('book')->where('id', $book_id)->setField('detail_img', join(',', array_merge(explode(',', $pre_image_id), $image_id)));
    }
    public function deleteDetailImage($book_id, $image_id){
        $pre_image_id = explode(',', Db::table('book')->where('id', $book_id)->value('detail_img'));
        array_splice($pre_image_id, array_search($image_id, $pre_image_id),1);
        return Db::table('book')->where('id', $book_id)->setField('detail_img', join(',', $pre_image_id));
    }
}