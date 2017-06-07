<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/5
 * Time: 9:58
 */

namespace app\Common\Lib;


use app\Common\Logic\Resource;
use think\Db;
use think\File;
use think\Image;

class ImageHandle
{
    protected $img_file;
    protected $image;
    public function __construct($img_file)
    {
        $this->img_file = $img_file;
        $this->image = Image::open($this->img_file);
    }
    public function createCrop($x, $y, $width, $height){
        return $this->image->crop($width, $height, $x, $y);
    }
    public function saveImage($save_path, $type, $image_name = null){
        if(!file_exists($save_path)){
            mkdir($save_path, 0777, true);
        }
        if($image_name == null){
            $image_name = time().rand(1,1000);
        }
        $image_name .= ".".$this->image->type();

        $resource_logic = new Resource();
        $res_add = $resource_logic->add($image_name, $type);
        if($res_add){
            $this->image->save($save_path.$image_name);
        }
        return $res_add;
    }
    public function saveCropImage($x, $y, $width, $height, $save_path, $type, $image_name = null){
        $this->createCrop($x, $y, $width, $height);
        return $this->saveImage($save_path, $type, $image_name);
    }
}