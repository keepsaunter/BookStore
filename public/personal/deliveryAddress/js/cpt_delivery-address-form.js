/**
 * Created by ouchao on 2017/5/15.
 */
/**
 * Created by ouchao on 2017/5/15.
 */
import { React, PATH } from  '../../../js/my-import';
import { Form, Input, Icon, Button, Checkbox, message, Popconfirm } from 'antd';
import '../css/cpt_delivery-address-form.css';
const FormItem = Form.Item;
class DeliveryAddressFormOb extends React.Component {
    static defaultProps = {
        data: {},
        is_mouse_over: false,
        addHandle(){},
        updateHandle(){},
        deleteHandle(){},
    }
    constructor(props){
        super(props);
        this.state = {
            is_editing: this.props.data['id'] == '',
            check_is_default: this.props.data['is_default'] == 1,
        }
    }
    btnClickHandle(){
        if(this.state.is_editing){
            this.props.form.validateFields((err, fieldsValue)=>{
                if(!err){
                    fieldsValue['is_default'] = this.state.check_is_default ? 1 : 0;
                    if(this.props.data['id'] == ''){
                        $.redirectPost(
                            PATH['_URL_'] + 'personal/deliveryaddress/addDeliveryAddress',
                            fieldsValue,
                            (res)=>{
                                if(res.status == 100){
                                    message.success(res.info);
                                    fieldsValue['id'] = res['data'];
                                    fieldsValue['area'] = '';
                                    this.props.addHandle(fieldsValue);
                                }else{
                                    message.error(res.info);
                                }
                            }
                        )
                    }else{
                        fieldsValue['id'] = this.props.data.id;
                        $.redirectPost(
                            PATH['_URL_'] + 'personal/deliveryaddress/updateDeliveryAddress',
                            fieldsValue,
                            (res)=>{
                                if(res.status == 100){
                                    message.success(res.info);
                                    fieldsValue['area'] = '';
                                    this.setState({is_editing: false});
                                    this.props.updateHandle(fieldsValue);
                                }else{
                                    message.error(res.info);
                                }
                            }
                        )
                    }
                }else{
                    message.warning("请填写所有的数据！")
                }
            });
        }else{
            this.setState({is_editing: true});
        }
    }
    checkChangeHandle(e){
        this.state.check_is_default = e.target.checked;
    }
    deleteHandle(){
        var id = this.props.data.id;
        $.redirectPost(
            PATH['_URL_'] + 'personal/deliveryaddress/deleteDeliveryAddress',
            {
                id: id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.props.deleteHandle(id);
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    render(){
        const { is_mouse_over, data } = this.props;
        const { is_editing, check_is_default } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const smallFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                {
                    data['id'] != '' ?
                        <div>
                            <div className="delete_border_div"></div>
                            <div className="delete_icon_div"><Popconfirm title="Are you sure delete this address?" onConfirm={this.deleteHandle.bind(this)} okText="Yes" cancelText="No">
                                <Icon type="close" />
                            </Popconfirm></div>
                        </div> : <span> </span>
                }
                <Form className="delivery_address_form" layout="inline">
                    <FormItem
                        label="收货人"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('receiver', {
                            rules: [{ required: true, message: 'Please input your receiver!' }],
                            initialValue: data.receiver,
                        })(
                            <Input disabled={ !is_editing } placeholder="Receiver" />
                        )}
                    </FormItem>
                    <FormItem
                        label="地址"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: 'Please input your address!' }],
                            initialValue: data.address,
                        })(
                            <Input disabled={ !is_editing } placeholder="Address" />
                        )}
                    </FormItem>
                    <FormItem
                        label="邮编"
                        {...smallFormItemLayout}
                    >
                        {getFieldDecorator('zip_code', {
                            rules: [{ required: true, message: 'Please input your zip_code!' }],
                            initialValue: data.zip_code,
                        })(
                            <Input disabled={ !is_editing } placeholder="Zip_code" />
                        )}
                    </FormItem>
                    <FormItem
                        label="电话"
                        {...smallFormItemLayout}
                    >
                        {getFieldDecorator('tel', {
                            rules: [{ required: true, message: 'Please input your tel!' }],
                            initialValue: data.tel,
                        })(
                            <Input disabled={ !is_editing } type="tel" placeholder="Tel" />
                        )}
                    </FormItem>
                    <Checkbox defaultChecked={check_is_default} onChange={this.checkChangeHandle.bind(this)} style={is_editing ? {marginLeft:'6%', paddingTop:'10px'} : {marginLeft:'6%', paddingTop:'10px', display:'none'}}>设为默认</Checkbox>
                    <div>
                        <div style={{float:'right', marginRight:'4%', height:'30px'}}>
                            <Button style={is_mouse_over || is_editing ? {} : {display:'none'}} onClick={this.btnClickHandle.bind(this)}>
                                <Icon type={ is_editing ? "check" : "edit"} />
                            </Button>
                            <spn style={!is_mouse_over && !is_editing && data.is_default == 1 ? {color: '#1179D9'} : {display:'none',color: '#1179D9'}}><Icon type="environment" />默认地址</spn>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
const DeliveryAddressForm = Form.create()(DeliveryAddressFormOb);
export { DeliveryAddressForm };