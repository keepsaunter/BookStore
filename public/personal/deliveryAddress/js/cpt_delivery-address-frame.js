/**
 * Created by ouchao on 2017/5/15.
 */
import { React } from  '../../../js/my-import';
import { Card } from 'antd';
import { DeliveryAddressForm } from './cpt_delivery-address-form';
class DeliveryAddressFrame extends React.Component {
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
        addHandle(){},
        updateHandle(){},
        deleteHandle(){},
    }
    constructor(props){
        super(props);
        this.state = {
            is_mouse_over: false,
        }
    }
    mouseEnterHandle(){
        this.setState({is_mouse_over: true});
    }
    mouseLevelHandle(){
        this.setState({is_mouse_over: false});
    }
    render(){
        const { data, addHandle, updateHandle, deleteHandle } = this.props;
        const { is_mouse_over } = this.state;
        return (
            <Card style={{marginBottom:'14px', position:'relative'}} onMouseEnter={this.mouseEnterHandle.bind(this)} onMouseLeave={this.mouseLevelHandle.bind(this)}>
                <DeliveryAddressForm data={data} is_mouse_over={is_mouse_over} deleteHandle={ deleteHandle } addHandle={ addHandle } updateHandle={ updateHandle } />
            </Card>
        )
    }
}
export { DeliveryAddressFrame };