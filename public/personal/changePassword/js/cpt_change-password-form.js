/**
 * Created by ouchao on 2017/5/22.
 */
import {React, $, PATH} from  '../../../js/my-import';
import { Form, Input, Card, Button, message, Icon } from 'antd';
const FormItem = Form.Item;

class ChangePasswordFormFrame extends React.Component {
    setNewPassword(){
        if(this.props.form.getFieldValue('pre_password') != this.props.form.getFieldValue('password')){
            if(this.props.form.getFieldValue('password') == this.props.form.getFieldValue('confirm')){
                this.props.form.validateFields((err, values) => {
                    if(!err){
                        $.post(
                            PATH['_URL_'] + 'personal/Changepassword/Changepassword',
                            values,
                            (res)=>{
                                if(res.status == 100){
                                    message.success(res.info);
                                    location.href = PATH['_URL_'] + 'Login/login'
                                }else{
                                    message.error(res.info);
                                }
                            }
                        )
                    }else{
                        message.error("请填写必要数据！");
                    }
                });
            }else{
                message.error("两次输入的密码不一致！");
            }
        }else {
            message.error("输入的原密码与新密码一致！");
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Card>
                <Form style={{width:'76%',margin:'auto'}}>
                    <FormItem
                        {...formItemLayout}
                        label="原有密码"
                        hasFeedback
                    >
                        {getFieldDecorator('pre_password', {
                            rules: [{
                                required: true, message: 'Please input your Pre password!',
                            },{
                                min: 6,
                            },{
                                max: 16,
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="登录密码"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            },{
                                min: 6,
                            },{
                                max: 16,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            },{
                                min: 6,
                            },{
                                max: 16,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <div style={{textAlign:'center'}}>
                        <Button onClick={this.setNewPassword.bind(this)} style={{width:'200px'}} size="large" type="primary">设置</Button>
                    </div>
                </Form>
            </Card>
        )
    }
}
const ChangePasswordForm = Form.create()(ChangePasswordFormFrame);
export { ChangePasswordForm };