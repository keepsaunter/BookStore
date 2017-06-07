var webpack = require('webpack');
var path = require('path');
var public_path =  './public/';
module.exports = {
    //页面入口文件配置
    entry: {
        'login/login':[
            public_path+'login/login/js/index.js'
        ],
        'login/register':[
            public_path+'login/register/js/index.js'
        ],
        'index/index':[
            public_path+'index/index/js/index.js'
        ],
        'admin/addBook':[
            public_path+'admin/addBook/js/index.js'
        ],
        'admin/index':[
            public_path+'admin/index/js/index.js'
        ],
        'admin/addImage/coverImage':[
            public_path+'admin/addImage/coverImage/js/index.js'
        ],
        'admin/addImage/detailImage':[
            public_path+'admin/addImage/detailImage/js/index.js'
        ],
        'admin/addImage/advertImage':[
            public_path+'admin/addImage/advertImage/js/index.js'
        ],
        'admin/editClassify':[
            public_path+'admin/editClassify/js/index.js'
        ],
        'admin/addTags':[
            public_path+'admin/addTags/js/index.js'
        ],
        'admin/scanBook':[
            public_path+'admin/scanBook/js/index.js'
        ],
        'admin/scanOrder':[
            public_path+'admin/scanOrder/js/index.js'
        ],
        'book/scanBook':[
            public_path+'book/scanBook/js/index.js'
        ],
        'book/searchBook':[
            public_path+'book/searchBook/js/index.js'
        ],
        'book/bookDetail':[
            public_path+'book/bookDetail/js/index.js'
        ],
        'personal/myOrder':[
            public_path+'personal/myOrder/js/index.js'
        ],
        'personal/personalInfo':[
            public_path+'personal/personalInfo/js/index.js'
        ],
        'personal/changeTel':[
            public_path+'personal/changeTel/js/index.js'
        ],
        'personal/changePassword':[
            public_path+'personal/changePassword/js/index.js'
        ],
        'personal/personalCollect':[
            public_path+'personal/personalCollect/js/index.js'
        ],
        'personal/deliveryAddress':[
            public_path+'personal/deliveryAddress/js/index.js'
        ],
        'homepage/homepage':[
            public_path+'homepage/homepage/js/index.js'
        ],
        'shoppingcart/index':[
            public_path+'shoppingcart/index/js/index.js'
        ],
        'shoppingcart/createOrder':[
            public_path+'shoppingcart/createOrder/js/index.js'
        ],
    },
    //入口文件输出配置
    output: {
        path: __dirname + '/public/',
        filename: '[name]/js/bundle.js',
    },
    module: {
        //加载器配置
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            // {                        //jsx-loader并不能解析es6的import语法，所以直接使用 babel-loader
            //     test: /\.js$/,
            //     loader: 'jsx-loader?harmony'
            // },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=assetImages/[hash:8].[name].[ext]'
            },
            {
                test: /\.js|jsx$/,
//              loaders: ['react-hot', 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                loaders: ['babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                // include: path.join(__dirname, 'js')  //会限制可解析的js文件路径
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.scss']
//      extensions: ['', '.js', '.json', '.scss']
    },
    //插件项
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};