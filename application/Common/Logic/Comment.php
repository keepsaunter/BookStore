<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/6
 * Time: 17:54
 */

namespace app\Common\Logic;
use app\Common\Lib\ImageHandle;
use think\Db;

class Comment extends MyModel
{
    public function addComment($user_id, $book_id, $level=0, $content='', $tags='', $image){
        $comment_count = Db::table('comment')->where('book_id', $book_id)->count();
        $pre_level = Db::table('book')->where('id', $book_id)->value('comment_level');
        $new_level = ($comment_count * $pre_level + $level) / ($comment_count + 1);
        Db::table('book')->where('id', $book_id)->setField('comment_level', $new_level);

        $image_data = [];
        if(count($image) > 0){
            foreach ($image as $key => $val){
                $image_data[] = (new ImageHandle($val))->saveImage(config('path_book_comment_img'), config('resource_type_comment'));
            }
        }
        $data = [
            "user_id" => $user_id,
            "book_id" => $book_id,
            "level" => $level,
            "content" => $content,
            "img" => join($image_data, ','),
            'add_time' => date('Y-m-d H:i:s'),
        ];
        $comment_id = Db::table('comment')->insertGetId($data);

        $tags = explode(',', $tags);
        $tags_data = [];
        foreach ($tags as $key => $val){
            $tags_data[] = ['comment_id'=>$comment_id, 'tag_id'=>$val];
        }
        if(count($tags_data) > 0){
            Db::table('comment_tag_info')->insertAll($tags_data);
        }

        return $comment_id;
    }
}