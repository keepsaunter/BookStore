/**
 * Created by ouchao on 2017/4/18.
 */
import {React, PATH} from  '../../../js/my-import';
import LoginInputFrame  from './cpt_login-input-frame';
import { LocaleProvider, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

class LoginFrame extends React.Component {
    render(){
        return (
            <div className="loginFrame" style={{backgroundImage: 'url('+PATH['_PUBLIC_']+'login/images/login_background.png)',  minWidth:'1500px'}}>
                <div className="loginInputFrame" style={{backgroundImage: 'url('+PATH['_PUBLIC_']+'login/images/login_input_background.png)'}}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="账号登录" key="1">
                            <LoginInputFrame/>
                        </TabPane>
                        <TabPane tab="扫码登录" key="2">
                            <img src={PATH['_PUBLIC_']+'login/images/my_qr_code.png'} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default LoginFrame;