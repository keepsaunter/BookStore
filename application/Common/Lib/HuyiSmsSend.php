<?php
/**
 * Created by PhpStorm.
 * User: ouchao
 * Date: 2017/5/21
 * Time: 18:09
 */

namespace app\Common\Lib;

class HuyiSmsSend
{
    protected $target = 'http://106.ihuyi.cn/webservice/sms.php?method=Submit';
    protected $acoount = 'C44658900';
    protected $password = 'a2009e90b7106ba6d5403227c40c0432';
    protected $message_code = '';
    public function Post($curlPost,$url){
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
        $return_str = curl_exec($curl);
        curl_close($curl);
        return $return_str;
    }
    public function xml_to_array($xml){
        $reg = "/<(\\w+)[^>]*>([\\x00-\\xFF]*)<\\/\\1>/";
        $arr = [];
        if(preg_match_all($reg, $xml, $matches)){
            $count = count($matches[0]);
            for($i = 0; $i < $count; $i++){
                $subxml= $matches[2][$i];
                $key = $matches[1][$i];
                if(preg_match( $reg, $subxml )){
                    $arr[$key] = $this->xml_to_array( $subxml );
                }else{
                    $arr[$key] = $subxml;
                }
            }
        }
        return $arr;
    }
    public function random($length = 6) {
        PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
        $hash = sprintf('%0'.$length.'d', mt_rand(0, pow(10, $length) - 1));
        return $hash;
    }
    public function getPostData($tel){
        $this->message_code = $this->random();
        return 'account='.$this->acoount.'&password='.$this->password.'&mobile='.$tel.'&content='.rawurlencode('您的验证码是：'.$this->message_code.'。请不要把验证码泄露给其他人。');
    }
    public function confirm($tel){
        if(!isset($_SESSION)){
            session_start();
        }
        header("Content-type:text/html; charset=UTF-8");
        $gets =  $this->xml_to_array($this->Post($this->getPostData($tel), $this->target));
        if($gets['SubmitResult']['code']==2){
            $_SESSION['mobile_code'] = $this->message_code;
        }
        return $gets['SubmitResult']['msg'];
    }
}