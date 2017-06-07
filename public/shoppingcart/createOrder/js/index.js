/**
 * Created by ouchao on 2017/5/13.
 */
import { React, ReactDom, $, PATH } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { AddressSelect } from './cpt_address-select';
import { OrderBookConfirm } from './cpt_order_book_confirm';
import { Collapse, Button, Icon, message } from 'antd';
import '../css/index.css';
const Panel  = Collapse.Panel;

class CreateOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            balance_btn_is_loading: false,
            total_price: 0,
            delivery_address_id: '',
            pay_type: 0,
        }
    }
    updateTotalPrice(total_price){
        this.setState({total_price: total_price});
    }
    updateDeliveryAddress(delivery_address_id){
        this.setState({delivery_address_id: delivery_address_id});
    }
    readyPayOrder(){
        this.setState({balance_btn_is_loading: true});
        let data = this.state;
        $.redirectPost(
            PATH['_URL_'] + 'shoppingcart/createorder/readyPayOrder',
            {
                'total_price': data['total_price'],
                'delivery_address_id': data['delivery_address_id'],
                'pay_type': data['pay_type'],
            },
            (res)=>{
                if(res.status == 100){
                    message.loading("支付成功！");
                    location.href =  PATH['_URL_'] + 'personal/myorder';
                }else{
                    message.loading("支付失败！");
                }
                this.setState({balance_btn_is_loading: false});
            }
        )
    }
    render(){
        const { total_price, balance_btn_is_loading } = this.state;
        return (
            <div style={{minWidth:'1420px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                    <Collapse defaultActiveKey={['1', '2', '3']}>
                        <Panel header="收件人信息" key="1">
                            <AddressSelect updateDeliveryAddress={this.updateDeliveryAddress.bind(this)} />
                        </Panel>
                        <Panel header="商品确认" key="2">
                            <OrderBookConfirm updateTotalPrice={this.updateTotalPrice.bind(this)} />
                        </Panel>
                        <Panel header="支付方式" key="3">
                            <p><img style={{border:'solid 1px red'}} src={ PATH['_PUBLIC_']+"images/alipay.png"} /></p>
                        </Panel>
                    </Collapse>
                    <div style={{height:'40px'}}>
                        <div className="new_order_balance_div">
                            <span style={{marginLeft:'64%',whiteSpace:'pre'}}>总计：  <span style={{fontSize:'16px', color:'red', display:'inline-block', minWidth:'120px'}}>￥{ total_price.toFixed(2) }</span></span>
                            <span><Button loading={ balance_btn_is_loading } size="large" style={{marginLeft:'1%',width:'14%'}} onClick={this.readyPayOrder.bind(this)}><Icon type="pay-circle-o" />支付</Button></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<CreateOrder />, contain);