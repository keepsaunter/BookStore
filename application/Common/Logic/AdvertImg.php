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

class AdvertImg extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\AdvertImg($data);
    }
    public function addAdvertImg($image, $title){
        $count = Db::table('advert_img')->count();
        if($count >= 16){
            return false;
        }else{
            $img_handle = new ImageHandle($image);
            $image_id = $img_handle->saveImage(config('path_advert_img'), config('resource_type_advertisement'));
            $data = [
                'id' => intval(Db::table('advert_img')->max('id')) + 1,
                'img_id' => $image_id,
                'title' => $title,
                'status' => 1,
            ];
            return Db::table('advert_img')->insertGetId($data);
        }
    }
    public function getAdvertImg($is_select =''){
        if($is_select != ''){
            $res = Db::table('advert_img')->where('status', $is_select)->select();
        }else{
            $res = Db::table('advert_img')->select();
        }
        $advert_image_path = config('path_advert_img');
        $res = array_map(function($val) use($advert_image_path){
                $val['img_src'] = $advert_image_path.Resource::getResourceValue($val['img_id']);
                return $val;
        }, $res === false ? [] : $res);
        return $res;
    }
    public function deleteAdvertImg($id){
        $img_id = Db::table('advert_img')->where('id', $id)->value('img_id');
        $res_advert_img_delete = Db::table('advert_img')->delete($id);
        if($res_advert_img_delete !== false){
            Db::table('resource')->delete($img_id);
        }
        return $res_advert_img_delete;
    }
    public function setAdvertImgStatus($advert_id, $status){
        return Db::table('advert_img')->where('id', $advert_id)->setField('status', $status);
    }

}