/**
 * Created by ouchao on 2017/5/16.
 */
import { React, PATH } from  '../../../js/my-import';
import { Form, Input, Checkbox, Modal, Button, message } from 'antd';
import '../css/cpt_address-edit-frame.css';
const FormItem = Form.Item;
class AddressEditForm extends React.Component {
    static defaultProps = {
        data: {},
        props_is_visible: false,
        updateHandle(){},
        updateVisible(){},
    }
    constructor(props){
        super(props);
        this.state = {
            is_loading: false,
            is_checked: this.props.data['is_default'] != 0,
        }

    }
    componentWillReceiveProps(new_props){
        this.setState({is_checked: new_props.data['is_default'] != 0});
    }
    checkChangeHandle(e){
        this.setState({is_checked: e.target.checked});
    }
    cancelHandle(){
        this.props.updateVisible(false);
    }
    handleOk(){
        this.props.form.validateFields((err, fieldsValue)=>{
            if(!err){
                this.setState({is_loading: true});
                fieldsValue['is_default'] = this.state.is_checked ? 1: 0;
                if(fieldsValue['id'] == ''){
                    this.addAddress(fieldsValue);
                }else{
                    this.updateAddress(fieldsValue);
                }
                this.setState({is_loading: false});
                this.props.form.resetFields();
            }
        })
    }
    updateAddress(address_data){
        $.redirectPost(
            PATH['_URL_'] + 'shoppingcart/createorder/updateAddress',
            address_data,
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.props.updateHandle(address_data, false);
                }else{
                    message.error(res.info);
                }
            }
        );
    }
    addAddress(address_data){
        $.redirectPost(
            PATH['_URL_'] + 'shoppingcart/createorder/addAddress',
            address_data,
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    address_data['id'] = res.data;
                    this.props.updateHandle(address_data, true);
                }else{
                    message.error(res.info);
                }
            }
        );
    }
    render(){
        const { data, props_is_visible } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { is_loading, is_checked } = this.state;
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
        return(
            <Modal
                title="编辑"
                wrapClassName="vertical-center-modal"
                visible={props_is_visible}
                onCancel={this.cancelHandle.bind(this)}
                footer={[
                    <Button key="back" size="large" onClick={this.cancelHandle.bind(this)}>撤销</Button>,
                    <Button key="ok"  size="large" loading={is_loading} onClick={this.handleOk.bind(this)}>
                        确认
                    </Button>,
                ]}
            >
                <Form className="address_edit_form" layout="horizontal">
                    <FormItem style={{display:'none'}}>
                        {getFieldDecorator('id', {
                            initialValue: data.id,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        label="收货人"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('receiver', {
                            rules: [{ required: true, message: 'Please input your receiver!' }],
                            initialValue: data.receiver,
                        })(
                            <Input placeholder="Receiver" />
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
                            <Input placeholder="Address" />
                        )}
                    </FormItem>
                    <FormItem
                        label="邮编"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('zip_code', {
                            rules: [{ required: true, message: 'Please input your zip_code!' }],
                            initialValue: data.zip_code,
                        })(
                            <Input placeholder="Zip_code" />
                        )}
                    </FormItem>
                    <FormItem
                        label="电话"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('tel', {
                            rules: [{ required: true, message: 'Please input your tel!' }],
                            initialValue: data.tel,
                        })(
                            <Input type="tel" placeholder="Tel" />
                        )}
                    </FormItem>
                    <Checkbox checked={is_checked} style={{marginLeft: '3%'}} onChange={this.checkChangeHandle.bind(this)}>设为默认</Checkbox>
                </Form>
            </Modal>
        )
    }
}
const AddressEdit = Form.create()(AddressEditForm);
export { AddressEdit };