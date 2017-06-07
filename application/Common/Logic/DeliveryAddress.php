<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/15
 * Time: 11:28
 */

namespace app\Common\Logic;
use app\Common\Model;
use think\Db;

class DeliveryAddress extends MyModel
{
    public function __constructDefault($data){
        $this->model = new Model\DeliveryAddress($data);
    }
    public function getAddress($user_id){
        return Db::table('delivery_address')->where('user_id', $user_id)->order('is_default desc', 'id')->select();
    }
    public function addAddress($user_id, $receiver, $address, $zip_code, $tel, $is_default, $area=''){
        $data = ['user_id'=>$user_id, 'receiver'=>$receiver, 'address'=>$address, 'zip_code'=>$zip_code, 'tel'=>$tel, 'is_default'=>$is_default, 'area'=>$area];
        if($is_default == 1){
            Db::table('delivery_address')->where('user_id', $user_id)->setField('is_default', 0);
        }
        return Db::table('delivery_address')->insertGetId($data);
    }
    public function updateAddress($id, $receiver, $address, $zip_code, $tel, $is_default, $area=''){
        $data = ['id'=>$id, 'receiver'=>$receiver, 'address'=>$address, 'zip_code'=>$zip_code, 'tel'=>$tel, 'is_default'=>$is_default, 'area'=>$area];
        if($is_default == 1){
            $user_id = Db::table('delivery_address')->where('id', $id)->value('user_id');
            Db::table('delivery_address')->where('user_id', $user_id)->setField('is_default', 0);
        }
        return Db::table('delivery_address')->update($data);
    }
    public function deleteAddress($id){
        return Db::table('delivery_address')->delete($id);
    }
    public function getDliveryAddress($id){
        return Db::table('delivery_address')->where('id', $id)->find();
    }
}