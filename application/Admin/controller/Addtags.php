<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/6
 * Time: 9:58
 */

namespace app\Admin\controller;
use app\Common\Lib\AdminCheckedController;
use app\Common\Lib\DatabaseResponse;
use app\Common\Logic\CommentTag;

class Addtags extends AdminCheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getTags(){
        return (new CommentTag())->getTypeTags();
    }
    public function addTag(){
        return (new DatabaseResponse((new CommentTag())->addTag($_POST['title'], $_POST['type']), '添加成功', '添加失败'))->out();
    }
    public function deleteTag(){
        return (new DatabaseResponse((new CommentTag())->deleteTag($_POST['tag_id']), '删除成功', '删除失败'))->out();
    }
}