<?php
namespace app\Common\Model;
use think\Model;
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/4/21
 * Time: 9:20
 */
class User extends Model
{
    protected $table = 'user';
    public function tt(){
//        return $this->getAttr("password");
    }
}