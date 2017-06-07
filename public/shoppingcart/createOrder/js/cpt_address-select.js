/**
 * Created by ouchao on 2017/5/16.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { AddressSelectCard } from './cpt_address-select-card'
import { Button, Icon, Modal, message } from 'antd';
import { AddressEdit } from './cpt_address-edit-frame';

class AddressSelect extends React.Component{
    static defaultProps = {
        updateDeliveryAddress(){},
    }
    constructor(props){
        super(props);
        this.empty_data = {
            'id': '',
            'area': '',
            'receiver': '',
            'address': '',
            'tel': '',
            'zip_code': '',
            'is_default': 0,
        };
        this.state = {
            data: [],
            selected_id: 0,
            edit_modal_isVisible: false,
            editing_data: this.empty_data
        }
    }
    componentWillMount(){
        this.getAddress();
    }
    getAddress(){
        $.redirectPost(
            PATH['_URL_'] + 'shoppingcart/createOrder/getAddress',
            (res)=>{
                if(res.length > 0){
                    this.state.selected_id = res[0]['id'];
                    this.props.updateDeliveryAddress(res[0]['id']);
                }
                this.setState({data: res});
            }
        )
    }
    updateEditModalVisible(value){
        this.setState({edit_modal_isVisible: value});
    }
    editAddress(data){
        this.state.editing_data = data;
        this.setState({edit_modal_isVisible: true});
    }
    addAddressHandle(){
        this.setState({editing_data: this.empty_data, edit_modal_isVisible: true});
    }
    changeSelect(address_id){
        if(this.state.selected_id != address_id){
            this.setState({selected_id: address_id});
            this.props.updateDeliveryAddress(address_id);
        }
    }
    updateData(address_data, is_add){
        if(is_add){
            if(address_data['is_default'] == 0){
                this.state.data = this.state.data.concat([address_data]);
            }else{
                this.state.data[0]['is_default'] = 0;
                this.state.data = [address_data].concat(this.state.data);
            }
            this.setState({selected_id: address_data['id']});
        }else{
            let temp_data = this.state.data;
            if(address_data['is_default'] == 0){
                for (let i=0;i<temp_data.length;i++){
                    if(temp_data[i]['id'] == address_data['id']){
                        temp_data[i] = address_data;
                        break;
                    }
                }
            }else{
                temp_data[0]['is_default'] = 0;
                for (let i=0;i<temp_data.length;i++){
                    if(temp_data[i]['id'] == address_data['id']){
                        temp_data.splice(i, 1);
                        this.state.data = [address_data].concat(temp_data);
                        break;
                    }
                }
            }
        }
        this.setState({edit_modal_isVisible: false});
    }
    render(){
        const { data, selected_id, editing_data, edit_modal_isVisible } = this.state;
        return (
            <div>
                {
                    data.map((val, index)=>{
                        return (
                            <div key={index} style={{display:'inline-block', marginRight:'1%'}} onClick={this.changeSelect.bind(this, val.id)}>
                                <AddressSelectCard is_selected={val.id == selected_id} data={val} editAddress={this.editAddress.bind(this)} />
                            </div>
                        )
                    })
                }
                <div style={{display:'inline-block', float:'right'}} onClick={this.addAddressHandle.bind(this)}>
                    <Button><Icon type="plus" /></Button>
                </div>
                    <AddressEdit updateVisible={this.updateEditModalVisible.bind(this)} props_is_visible={edit_modal_isVisible} updateHandle={this.updateData.bind(this)} data={ editing_data } />
            </div>
        );
    }
}
export { AddressSelect }