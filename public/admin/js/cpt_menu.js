/**
 * Created by ouchao on 2017/4/29.
 */
import { React, PATH, $ } from  '../../js/my-import';
import { Menu, Icon, Layout } from 'antd';

const { Sider } = Layout;
import '../css/cpt_menu.css';
const SubMenu = Menu.SubMenu;

class AdminMenu extends React.Component {
    static defaultProps = {
        selected_key: 'admin/addBook',
    }
    constructor(props){
        super(props);
        this.state = {
            collapsed: $.cookie('admin_menu_collapsed') == undefined ? false : ($.cookie('admin_menu_collapsed') != 'false'),
        }
    }
    toggle = () => {
        let temp = !this.state.collapsed;
        $.cookie('admin_menu_collapsed', temp);
        this.setState({
            collapsed: temp,
        });
    }
    handleClick = (e) => {
        if(e.key != "sub3"){
            location.href = PATH['_URL_'] + e.key;
        }
    }
    render(){
        const collapseIconStyle = this.state.collapsed ? {fontSize:'20px'} : {};
        return (
            <Sider className="menu_slider"
                onCollapse={this.toggle}
                collapsible
                collapsed={this.state.collapsed}
                style={{height:'100%'}}
            >
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.props.selected_key]}
                    mode={this.state.collapsed ? "vertical" : "inline"}
                >
                    <Menu.Item key="admin/addBook"><Icon type="wallet" style={collapseIconStyle} />添加图书</Menu.Item>
                    <SubMenu key="sub3" title={<span><Icon type="picture" style={collapseIconStyle} /><span>添加图片</span></span>}>
                        <Menu.Item key="admin/addImage/advertImage"><Icon type="notification" />广告图片</Menu.Item>
                        <Menu.Item key="admin/addImage/detailImage"><Icon type="scan" />细节图片</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="admin/addTags"><Icon type="tag-o" style={collapseIconStyle} />添加标签</Menu.Item>
                    <Menu.Item key="admin/editClassify"><Icon type="mail" style={collapseIconStyle} />图书分类</Menu.Item>
                    <Menu.Item key="admin/scanBook"><Icon type="book" style={collapseIconStyle} />浏览图书</Menu.Item>
                    <Menu.Item key="admin/scanOrder"><Icon type="schedule" style={collapseIconStyle} />浏览订单</Menu.Item>
                </Menu>

            </Sider>
        )
    }
}
export { AdminMenu };