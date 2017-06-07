/**
 * Created by ouchao on 2017/5/15.
 */
import { React, PATH } from  '../../js/my-import';
import { Menu, Icon } from 'antd';

import '../css/cpt_personal-menu.css';

class PersonalMenu extends React.Component {
    static defaultProps = {
        selected_key: 'personal/MyOrder',
    }
    handleClick = (e) => {
        location.href = PATH['_URL_'] + e.key;
    }
    render(){
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.props.selected_key]}
                mode= "inline"
            >
                <Menu.Item key="personal/MyOrder"><Icon type="schedule" />我的订单</Menu.Item>
                <Menu.Item key="personal/personalCollect"><Icon type="heart-o" />我的收藏</Menu.Item>
                <Menu.Item key="personal/deliveryAddress"><Icon type="environment-o" />我的收货地址</Menu.Item>
                <Menu.Item key="personal/changePassword"><Icon type="safety" />更改密码</Menu.Item>
                <Menu.Item key="personal/changeTel"><Icon type="link" />手机号绑定</Menu.Item>
                <Menu.Item key="personal/personalInfo"><Icon type="solution" />个人信息</Menu.Item>
            </Menu>
        )
    }
}
export { PersonalMenu };