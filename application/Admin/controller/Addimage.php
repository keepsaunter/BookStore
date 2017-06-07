<?php
namespace app\Admin\controller;
use app\Common\Lib\AdminCheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\AdvertImg;
use app\Common\Logic\Book;

class Addimage extends AdminCheckedController
{
    protected $beforeActionList = ['checkUserId'=> ['only'=>'coverimage,detailimage,advertimage'] ];
    public function coverImage(){
        return $this->fetch('coverImage');
    }
    public function detailImage(){
        if(!isset($_GET['book_id'])){
            $book_id = 0;
        }else{
            $book_id = $_GET['book_id'];
        }
        return $this->fetch('detailImage', ['book_id' => $book_id]);
    }
    public function advertImage(){
        return $this->fetch('advertImage');
    }
    public function getBookDetail(){
        return (new Book())->getBook($_POST['book_id'], 'id,name,img_id,author,edition,classification_id,price,add_datetime');
    }
    public function addDetailImage(){
        return (new DatabaseResponse((new Book())->addDetailImage($_POST['book_id'], request()->file('detail_img')), '添加成功', '添加失败'))->out();
    }
    public function getDetailImage(){
        return (new Book())->getDetailImage($_POST['book_id']);
    }
    public function deleteDetailImage(){
        return (new DatabaseResponse((new Book())->deleteDetailImage($_POST['book_id'], $_POST['img_id']), '删除成功！', '删除失败！'))->out();
    }

    public function addAdvertImage(){
        return (new DatabaseResponse((new AdvertImg())->addAdvertImg(request()->file('advert_img'), $_POST['title']), '添加成功！', '添加失败！'))->out();
    }
    public function getAdvertImage(){
        return (new AdvertImg())->getAdvertImg();
    }
    public function deleteAdvertImage(){
        return (new DatabaseResponse((new AdvertImg())->deleteAdvertImg($_POST['advert_id']), '删除成功！', '删除失败！'))->out();
    }
    public function updateAdvertImageSelect(){
        return (new DatabaseResponse((new AdvertImg())->setAdvertImgStatus($_POST['advert_id'], $_POST['status']), '操作成功！', '操作失败！'))->out();
    }
}