/**
 * Created by ouchao on 2017/5/11.
 */
import { React, $, PATH } from  './my-import';
import { Menu, Dropdown, Icon, message } from 'antd';
import { HomepageSearch } from  './cpt_homepage-search-frame';
import '../css/cpt_header-frame.css';

class HeaderFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user_name: $.cookie('user_name') == undefined ? '' : $.cookie('user_name'),
            scroll_status2: false,
        }
    }
    componentDidMount(){
        $(window).scroll((e)=>{
            if($(window).scrollTop() > 100){
                if(!this.state.scroll_status){
                    this.setState({scroll_status: true});
                }
            }else{
                if(this.state.scroll_status){
                    this.setState({scroll_status: false});
                }
            }
        });
    }
    myInfoDropdownHnadle(v){
        if(v.key == 1){
            location.href = PATH['_URL_'] + 'personal/MyOrder';
        }else if(v.key == 2){
            location.href = PATH['_URL_'] + 'personal/PersonalCollect';
        }else if(v.key == 3){
            location.href = PATH['_URL_'] + 'shoppingCart';
        }else if(v.key == 4){
            location.href = PATH['_URL_'] + 'personal/changePassword';
        }else if(v.key == 5){
            $.get(
                PATH['_URL_'] + 'personal/personalInfo/logOff',
                (res)=>{
                    if(res.status == 100){
                        message.success(res.info);
                        location.reload();
                    }else{
                        message.error(res.info);
                    }
                }
            )
        }
    }
    render(){
        const menu = (
            <Menu onClick={this.myInfoDropdownHnadle}>
                <Menu.Item key="1">我的订单</Menu.Item>
                <Menu.Item key="2">我的收藏</Menu.Item>
                <Menu.Item key="3">我的购物车</Menu.Item>
                <Menu.Item key="4">更改密码</Menu.Item>
                {
                    (()=>{
                        if($.cookie('user_id') != undefined){
                            return (
                                <Menu.Item key="5">注销登录</Menu.Item>
                            )
                        }
                    })()
                }
            </Menu>
        );
        const { scroll_status, user_name } = this.state;
        const header_div_styel = scroll_status ? {
            paddingBottom:'2px',position:'fixed',width:'100%',backgroundColor:'white',zIndex:'999',top:'0px'
        } : { paddingBottom:'10px' };
        return(
            <div>
                <div style={scroll_status ? {height: '160px'} : {}}></div>
                <div className="header_div" style={header_div_styel}>
                    <div className="login_info_div" style={scroll_status ? {display: 'none'} : {}}>
                        <div style={{width: '70%', margin:'auto'}}>
                            <div style={{float: 'right',height:'100%',paddingTop:'5px'}}>
                                <span>
                                    {
                                        user_name == '' ? <span>请<a href={PATH['_URL_']+'login/login'}>登录</a></span> : <span style={{color:'red'}}>欢迎：{user_name}</span>
                                    }
                                    <span style={{marginLeft:'16px'}}>
                                        <Dropdown overlay={menu}>
                                            <a className="ant-dropdown-link">
                                              我的书斋<Icon type="down" />
                                            </a>
                                        </Dropdown>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="home_search_frame_div">
                        <HomepageSearch scroll_status={this.state.scroll_status} />
                    </div>
                </div>
            </div>
        )
    }
}
export { HeaderFrame };