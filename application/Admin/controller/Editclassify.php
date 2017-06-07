<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/6
 * Time: 9:58
 */

namespace app\Admin\controller;
use app\Common\Lib\AdminCheckedController;
use app\Common\Lib\Response;
use app\Common\Logic\Classify;

class Editclassify extends AdminCheckedController
{
    public function index(){
        return $this->fetch('index');
    }
    public function getRoot(){
        return (new Classify(['id'=>0]))->getDirectChild();
    }
    public function getChild(){
        $id = $_POST['id'];
        return( (new Classify(['id'=>$id]))->getDirectGrandsonChild());
    }
    public function addChild(){
        $name = $_POST['name'];
        $parent_id = $_POST['parent_id'];
        $res = (new Classify(null))->add($name, $parent_id);
        if($res !== false){
            return (new Response('success', $res, '新增成功！'))->out();
        }else{
            return (new Response('error', $res, '新增失败！'))->out();
        }
    }
    public function deleteChild(){
        $id = $_POST['id'];
        $res = (new Classify(['id'=>$id]))->delete();
        if($res !== false){
            return (new Response('success', $res, '删除成功！'))->out();
        }else{
            return (new Response('error', $res, '删除失败！'))->out();
        }
    }
}