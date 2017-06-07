<?php
namespace app\Admin\controller;
use app\Common\Lib\AdminCheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Lib\ImageHandle;
use app\Common\Logic\Book;
use app\Common\Logic\Classify;

class Addbook extends AdminCheckedController
{
    public function index(){
        return $this->fetch("index");
    }
    public function addBook(){
        $img = request()->file('cover_img');
        $img_handle = new ImageHandle($img);
        $temp = $_POST;
        $img_id = $img_handle->saveCropImage($temp['px'], $temp['py'], $temp['pwidth'], $temp['pheight'], config('path_book_cover_img'), config('resource_type_cover'));
        $temp['catalogue'] = serialize(explode('[TEMP]', $_POST['catalogue']));
        $data = array(
            'name' => $temp['name'],'img_id' => $img_id,'synopsis' => $temp['synopsis'],
            'catalogue' => $temp['catalogue'],'edition' => $temp['edition'],'print_date' => $temp['print_date'],
            'classification_id' => $temp['classify_id'],'stock' => $temp['stock'],'price' => $temp['price'],
            'char_count' => $temp['char_count'],'page_count' => $temp['page_count'],'author' => $temp['author'],
        );
        $res = (new Book())->add($data);
        return (new DatabaseResponse($res, '新增成功！','新增失败！'))->out();
    }
    public function getClassify(){
        $id = $_POST['id'];
        return( (new Classify(['id'=>$id]))->createSelectOption());
    }

}