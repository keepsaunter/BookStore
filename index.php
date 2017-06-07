<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------
// [ 应用入口文件 ]
// 定义应用目录
//define('APP_PATH', __DIR__ . '/../application/');
define('APP_PATH', __DIR__ . '/application/');
//define('CONF_PATH', APP_PATH.'config/');  //配置了该选项会对模块配置文件产生影响(模块配置文件路径=CONF_PATH.$module.CONF_EXT)
//define('CONF_EXT','/config.php');
define('APP_DEBUG', true);
//define('WEBPACK_DEV_PUBLICPATH', 'http://localhost:8080/lib');
define('WEBPACK_DEV_PUBLICPATH', $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/BookStore' . '/public');
// 加载框架引导文件
//require __DIR__ . '/../thinkphp/start.php';
require __DIR__ . '/thinkphp/start.php';
//var_dump(Db::query('select * from user'));
//var_dump(\think\db::table('user')->find());
