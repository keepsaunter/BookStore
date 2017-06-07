<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/6
 * Time: 17:54
 */

namespace app\Common\Logic;
use \app\Common\Model;
use think\Db;

class Classify extends MyModel
{
    public function __construct($data = [])
    {
        parent::__construct($data);
    }
    public function __constructDefault($data){
        $this->model = new Model\Classify($data);
    }
    public function getName(){
        return Db::table($this->model->getTableName())->where('id', $this->model->getAttr('id'))->value('name');
    }
    public function add($name, $parent_id){
        return $this->model->insertGetId(['name' => $name, 'parent_id'=>$parent_id]);
    }
    public function getDirectChild(){
        return Db::table($this->model->getTableName())->where('parent_id', $this->model->getAttr('id'))->select();
    }
    public function delete(){
        if($this->model->getAttr('id') == 0){
            return $this->model->where('1=1')->delete();
        }
        $directChild = $this->getDirectChild();
        $directChild_ids = array_column($directChild, 'id');
        if(count($directChild_ids) > 0){
            $grandson_ids = Db::table($this->model->getTableName())->where('parent_id', 'in', $directChild_ids)->column('id');
            $directChild_ids = array_merge($directChild_ids, $grandson_ids);
        }
        $directChild_ids[] = $this->model->getAttr('id');
        return $this->model->where('id', 'in', $directChild_ids)->delete();
    }
    public function getDirectGrandsonChild(){
        $directChild = $this->getDirectChild();
        foreach ($directChild as $key => $val){
            $directChild[$key]['child'] = Db::table($this->model->getTableName())->where('parent_id', $val['id'])->select();
        }
        return $directChild;
    }
    public function getDirectGrandsonChildId(){
        $directChild = $this->getDirectChild();
        $directChild = array_column($directChild, 'id');
        $res = [];
        foreach ($directChild as $key => $val){
            $res[] = $val;
            $res = array_merge($res, Db::table($this->model->getTableName())->where('parent_id', $val)->column('id'));
        }
        return $res;
    }
    public function createSelectOption(){
        $res = null;
        $direct_child = $this->getDirectChild();
        if(count($direct_child) > 0){
            $res[] = $direct_child;
            $second_child = Db::table($this->model->getTableName())->where('parent_id', $direct_child[0]['id'])->select();
            if(count($second_child) > 0){
                $res[] = $second_child;
                $third_child = Db::table($this->model->getTableName())->where('parent_id', $second_child[0]['id'])->select();
                if(count($third_child) > 0){
                    $res[] = $third_child;
                }
            }
        }
        return $res;
    }
    public function getClassiWithParent($id){
        $table_name = $this->model->getTableName();
        $classification = Db::table($table_name)->where('id', $id)->find();
        $res[] = $classification;
        while ($classification['parent_id'] != 0){
            $classification = Db::table($table_name)->where('id', $classification['parent_id'])->find();
            $res = array_merge([$classification], $res);
        }
        return $res;
    }
    public function formatClassification($id, $char_ex ='/'){
        $classifications = $this->getClassiWithParent($id);
        return join($char_ex, array_column($classifications, 'name'));
    }
}