<?php
namespace app\Index\controller;
use think\Config;
use think\Controller;
use think\view;
use think\Db;

class Index extends Controller
{
    public function index()
    {
//        var_dump(Db::table('user')->find());
//        dump(config('view_replace_str'));
//        return '<style type="text/css">*{ padding: 0; margin: 0; } .think_default_text{ padding: 4px 48px;} a{color:#2E5CD5;cursor: pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family: "Century Gothic","Microsoft yahei"; color: #333;font-size:18px} h1{ font-size: 100px; font-weight: normal; margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"> <h1>:)</h1><p> ThinkPHP V5<br/><span style="font-size:30px">十年磨一剑 - 为API开发设计的高性能框架</span></p><span style="font-size:22px;">[ V5.0 版本由 <a href="http://www.qiniu.com" target="qiniu">七牛云</a> 独家赞助发布 ]</span></div><script type="text/javascript" src="http://tajs.qq.com/stats?sId=9347272" charset="UTF-8"></script><script type="text/javascript" src="http://ad.topthink.com/Public/static/client.js"></script><thinkad id="ad_bd568ce7058a1091"></thinkad>';
        return $this->fetch("index", ["name" => "ouchao"]);
    }
    public function getBestSellBookClassfy(){
        return (array(
            array(
                'id' =>  0,
                'name' => '分类一'),
            array(
                'id' =>  1,
                'name' => '分类二'),
            array(
                'id' =>  2,
                'name' => '分类三'),
            array(
                'id' =>  3,
                'name' => '分类四'),
            array(
                'id' =>  4,
                'name' => '分类五'),
            array(
                'id' =>  5,
                'name' => '分类六'),
        ));
    }
    public function getBestSellBooks(){
        $classfy_id = $_GET['classfy_id'];
        if($classfy_id == 0){
            return(
                array(
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                )
            );
        }else{
            return(
                array(
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book2.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book2.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                    array(
                        'id' => 1,
                        'img' => "url('./data/upload/books/book2.png')",
                        'name' => "this is a book",
                        'price' => "55.5",
                        'author' => "ouchao"
                    ),
                )
            );
        }
    }
    public function getNewBooks(){
        $page = $_GET['page'];
        if($page == 1) {
            return (array(
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
            ));
        }else{
            return (array(
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book2.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book2.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book2.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book2.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
                array(
                    'id' => 1,
                    'img' => "url('./data/upload/books/book2.png')",
                    'name' => "this is a book",
                    'price' => "55.5",
                    'author' => "ouchao"
                ),
            ));
        }
    }
}
