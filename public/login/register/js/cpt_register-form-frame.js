/**
 * Created by ouchao on 2017/5/21.
 */
import {React, $, PATH} from  '../../../js/my-import';
import { SlideConfirm } from  '../../../js/cpt_slide-confirm-frame';
import { Form, Input, Card, Button, message, Icon } from 'antd';
const FormItem = Form.Item;

class RegisterForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tel_check: false,
            name_check: false,
            slide_confirm_status: false,
            get_message_code_time: $('#get_message_code_time').val(),
        }
        this.getMessageCode = this.getMessageCode.bind(this);
        this.startTimeInterval = this.startTimeInterval.bind(this);
    }
    componentWillMount(){
        this.startTimeInterval();
    }
    startTimeInterval(){
        let _this = this;
        let time_interval = setInterval(()=>{
            let get_message_code_time = _this.state.get_message_code_time;
            if(get_message_code_time == 0){
                clearInterval(time_interval);
            }else{
                _this.setState({get_message_code_time: get_message_code_time - 1});
            }
        }, 1000);
    }
    changeSlideChecked(){
        this.setState({slide_confirm_status: true});
        this.getMessageCode();
    }
    telBlurCheckHandle(){
        if(!this.props.form.getFieldError('tel')){
            $.post(
                PATH['_URL_'] + 'login/register/checkTel',
                {
                    tel: this.props.form.getFieldValue('tel'),
                },
                (res)=>{
                    if(res.status == 100){
                        this.setState({tel_check: true});
                    }else{
                        message.error(res.info);
                    }
                }
            )
        }
    }
    nameBlurCheckHandle(){
        if(!this.props.form.getFieldError('name')){
            $.post(
                PATH['_URL_'] + 'login/register/checkUsername',
                {
                    name: this.props.form.getFieldValue('name'),
                },
                (res)=>{
                    if(res.status == 100){
                        this.setState({name_check: true});
                    }else{
                        message.error(res.info);
                    }
                }
            )
        }
    }
    getMessageCode(){
        if(this.state.get_message_code_time == 0){
            $.post(
                PATH['_URL_'] + 'login/register/getMessageConfirm',
                {
                    tel: this.props.form.getFieldValue('tel'),
                },
                (res)=>{
                    message.success(res);
                    this.state.get_message_code_time = 120;
                    this.startTimeInterval();
                    this.setState({get_message_code_time: this.state.get_message_code_time});
                }
            )
        }
    }
    registerHandle(){
        const { tel_check, name_check } = this.state;
        if(tel_check && name_check){
            if(this.props.form.getFieldValue('password') == this.props.form.getFieldValue('confirm')){
                this.props.form.validateFields((err, values) => {
                    if(!err){
                        $.post(
                            PATH['_URL_'] + 'login/register/register',
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
        }
    }
    render(){
        const { slide_confirm_status, tel_check, name_check, get_message_code_time } = this.state;
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
                        label="用户昵称"
                        hasFeedback
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: 'Please input your Name!',
                            }],
                        })(
                            <Input disabled={name_check} onBlur={this.nameBlurCheckHandle.bind(this)} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号码"
                        hasFeedback
                    >
                        {getFieldDecorator('tel', {
                            rules: [{
                                required: true, message: 'Please input your Tel!',
                            },{
                                pattern:/^1[34578]\d{9}$/, message: 'Please input right Tel!',
                            }],
                        })(
                            <Input disabled={tel_check} onBlur={this.telBlurCheckHandle.bind(this)} />
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
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    {
                        tel_check ?
                        slide_confirm_status ?
                            <FormItem
                                {...formItemLayout}
                                label="短信验证"
                            >
                                {getFieldDecorator('message_confirm', {
                                    rules: [{
                                        required: true, message: 'Message_confirm!',
                                    }],
                                })(
                                    <Input addonAfter={<span style={get_message_code_time == 0 ? {cursor:'pointer'} : {cursor:'not-allowed'}} onClick={this.getMessageCode.bind(this)}>{get_message_code_time == 0 ? '' : get_message_code_time+'s后'}重新获取</span>} />
                                )}
                            </FormItem>
                            :
                            <div style={{marginLeft:'14%', marginBottom:'24px'}}>
                                <SlideConfirm width="428" changeSlideChecked={this.changeSlideChecked.bind(this)} />
                            </div>
                            :<div> </div>
                    }
                    <div style={{textAlign:'center', marginBottom:'30px'}}>
                        <Button onClick={this.registerHandle.bind(this)} style={{width:'200px'}} size="large" type="primary">注册</Button>
                    </div>
                </Form>
                <span onClick={()=>location.href = PATH['_URL_'] + 'Login/login'}><a><Icon type="arrow-left" />直接登录</a></span>
            </Card>
        )
    }
}
const RegisterFormFrame = Form.create()(RegisterForm);
export { RegisterFormFrame };