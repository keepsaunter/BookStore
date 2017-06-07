/**
 * Created by ouchao on 2017/5/22.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { IdentityFrame } from '../../../js/cpt_identifycode-frame';

import { Form, Icon, Input, Button, Checkbox, message, Card } from 'antd';
const FormItem = Form.Item;

class AdminLiginFormFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            'password_visible' : false,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let identityFrame = this.refs.identityFrame;
        if(identityFrame.state.identify_status == 'success'){
            let login_jump_url = this.props.login_jump_url;
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    $.post(
                        PATH['_URL_'] + 'admin/index/login',
                        values,
                        (result)=> {
                            if (result.status == 100) {
                                message.loading(result.info);
                                location.href = PATH['_URL_'] + 'admin/addBook';
                            } else {
                                identityFrame.resetIdentifyStr();
                                message.error(result.info);
                            }
                        }
                    );
                }
            });
        }else{
            identityFrame.resetIdentifyStr();
            message.warning('please enter correct verify code!');
        }
    }
    changePasswordVisible = (e)=>{
        e.stopPropagation();
        this.setState({"password_visible": !this.state.password_visible});
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="管理员登录" style={{width:'460px',margin:'auto',marginTop:'180px'}}>
                <Form style={{width:'90%',margin:'auto'}} onSubmit={this.handleSubmit} className="login-form">
                    <FormItem hasFeedback>
                        {getFieldDecorator('userName',{
                            rules: [
                                { required: true, message: 'Please input your username!' },
                                { whitespace: false, },//message: '用户名不能有空格'
                                { min: 6, },//message: '用户名不能少于6个字符'
                                { max:15, },//message: '用户名不能超过15个字符'
                            ],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your Password!' },
                                { min: 6, },//message: '密码不能少于6个字符'
                                { max:15, },//message: '密码不能超过15个字符'
                            ],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type={this.state.password_visible ? "text" : "password"} placeholder="Password" suffix={<Icon type={this.state.password_visible ? "eye" : "eye-o"} onClick={this.changePasswordVisible}/>}/>
                        )}
                    </FormItem>
                    <IdentityFrame ref='identityFrame' />
                    <FormItem style={{marginBottom:'0px'}}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox style={{marginBottom:'10px'}}>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{float:'right'}}>Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

const AdminLiginForm = Form.create()(AdminLiginFormFrame);
export { AdminLiginForm };