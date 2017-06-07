/**
 * Created by ouchao on 2017/5/11.
 */
import { React, ReactDom, $, PATH } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { PersonalMenu } from '../../js/cpt_personal-menu';
import { DeliveryAddressFrame } from './cpt_delivery-address-frame';
import { PolygonTitle } from '../../../js/cpt_polygon-title';

class DeliveryAddress extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount(){
        this.getDeliveryAddress();
    }
    getDeliveryAddress(){
        $.redirectPost(
            PATH['_URL_'] + 'personal/deliveryaddress/getDeliveryAddress',
            (res)=>{
                this.setState({data: res});
            }
        )
    }
    addDeliveryAddress(data){
        let pre_data = this.state.data;
        if(data['is_default'] == 1 && pre_data.length > 0){
            pre_data[0]['is_default'] = 0;
            this.setState({data: [data].concat(pre_data)});
        }else{
            this.setState({data: pre_data.concat([data])});
        }
    }
   updateDeliveryAddress(data){
       let pre_data = this.state.data;
        for (let i=0; i<pre_data.length; i++){
            if(pre_data[i]['id'] == data['id']){
                if(pre_data[i]['is_default'] == 0 && data['is_default'] == 1){
                    pre_data[0]['is_default'] = 0;
                    pre_data.splice(i, 1);
                    this.setState({data: []});
                    this.setState({data: [data].concat(pre_data)});
                }else{
                    pre_data[i] = data;
                    this.setState({data: pre_data});
                }
                break;
            }
        }
    }
    deleteDeliveryAddress(id){
        let pre_data = this.state.data;
        for (let i=0; i<pre_data.length; i++){
            if(pre_data[i]['id'] == id){
                pre_data.splice(i, 1);
                this.setState({data: []});
                this.setState({data: pre_data});
            }
        }
    }
    render(){
        const { data } = this.state;
        return (
            <div style={{minWidth:'1420px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                    <div style={{width: '20%', float:'left'}}>
                        <PersonalMenu selected_key='personal/deliveryAddress'/>
                    </div>
                    <div style={{width: '74%', marginLeft:'26%'}}>
                        <PolygonTitle title="已有收货地址" />
                        <div style={{paddingLeft:'2%'}}>
                            {
                                data.map((val, index)=>{
                                    return  <DeliveryAddressFrame key={index} data={val} deleteHandle={this.deleteDeliveryAddress.bind(this)} updateHandle={this.updateDeliveryAddress.bind(this)} />
                                })
                            }
                        </div>
                        <PolygonTitle title="新增收货地址" />
                        <div style={{paddingLeft:'2%'}}>
                            <DeliveryAddressFrame addHandle={this.addDeliveryAddress.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<DeliveryAddress />, contain);