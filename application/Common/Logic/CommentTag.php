<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/6
 * Time: 17:54
 */

namespace app\Common\Logic;
use app\Common\Model;
use think\Db;

class CommentTag extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\CommentTag($data);
    }
    public function getTypeTags(){
        $res = Db::table('comment_tag')->select();
        $good_tag = [];$neuter_tag = [];$bad_tag = [];
        $type_good = config('comment_tag_type_good');
        $type_neuter = config('comment_tag_type_neuter');
        foreach ($res as $key=>$val){
            if($val['type'] == $type_good){
                $good_tag[] = $val;
            }else{
                if($val['type'] == $type_neuter){
                    $neuter_tag[] = $val;
                }else{
                    $bad_tag[] = $val;
                }
            }
        }
        return ['good_tags'=> $good_tag, 'neuter_tags'=>$neuter_tag, 'bad_tags'=>$bad_tag];
    }
    public function getTags($field = '*'){
        return Db::table('comment_tag')->field($field)->select();
    }
    public function addTag($tag_title, $type){
        return Db::table('comment_tag')->insertGetId(['value'=>$tag_title, 'type'=>$type]);
    }
    public function deleteTag($tag_id){
        $res_comment_tag_delete = Db::table('comment_tag')->delete($tag_id);
        if($res_comment_tag_delete !== false){
            Db::table('comment_tag_info')->where('tag_id', $tag_id)->delete();
        }
        return $res_comment_tag_delete;
    }
}