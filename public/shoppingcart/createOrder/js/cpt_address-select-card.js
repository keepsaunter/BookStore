/**
 * Created by ouchao on 2017/5/16.
 */
import { React } from  '../../../js/my-import';
import { Card, Icon } from 'antd';
import '../css/cpt_address-select-card.css';

class AddressSelectCard extends React.Component{
    static defaultProps = {
        data: {
            'id': '',
            'area': '',
            'receiver': '',
            'address': '',
            'tel': '',
            'zip_code': '',
            'is_default': 0,
        },
        is_selected: false,
        editAddress(){},
    }
    editHandle(e){
        e.preventDefault();
        e.stopPropagation();
        this.props.editAddress(this.props.data);
    }
    render(){
        const { data, is_selected } = this.props;
        return (
            <div>
                <Card className="address_card" title={ data.receiver } extra={<a onClick={this.editHandle.bind(this)}>编辑</a>} style={{ width: 300, position:'relative' }}>
                    <p>{ data.tel }</p>
                    <p>{ data.address }</p>
                    <p>{ data.zip_code }</p>
                    {
                        data.is_default ? <span style={{color:'#108EE9', height:'30px', lineHeight:'30px', float:'left'}}><Icon type="environment" />默认地址</span> : <span style={{height:'30px', float:'left'}}> </span>
                    }
                    <div className="check_sign_div" style={is_selected ? {} : {display:'none'}}>
                        <div></div>
                        <div><Icon type="smile-o" /></div>
                    </div>
                </Card>
            </div>
        );
    }
}
export { AddressSelectCard }