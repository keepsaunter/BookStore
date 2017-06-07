/**
 * Created by ouchao on 2017/4/16.
 */
import  'antd/dist/antd.css'
import  React from 'React';
import ReactDom from 'React-dom';
import $ from './jquery-vendor.js';
import './jquery_cookie';
let temp = window.location.pathname.substring(1);//为/WebBookstore/index.php/book/bookdetail
let _ROOT_PATH_ = "/"+temp.substring(0, temp.indexOf('/'))+"/";
let _PUBLIC_PATH_ = _ROOT_PATH_+"public/";
let _DATA_PATH_ = _ROOT_PATH_+"data/";
let PATH = {
    _ROOT_: _ROOT_PATH_,
    _PUBLIC_: _ROOT_PATH_+"public/",
    _DATA_: _ROOT_PATH_+"data/",
    _URL_: _ROOT_PATH_+"index.php/",
}
$.extend({
    redirectPost:(url, data, callback)=>{
        if($.isFunction(data)){
            callback = data;
            data={};
        }
        $.post(url, data, (res)=>{
            if(res.status == 302){
                if(res.location == undefined){
                    location.href = PATH['_URL_'] + 'login/login';
                }else{
                    location.href = res.location;
                }
            }else{
                callback(res);
            }
        })
    }
})
export {React, ReactDom, $, PATH};