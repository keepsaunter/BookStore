/**
 * Created by ouchao on 2017/4/18.
 */
/**
 * 验证码组件
 * 父组件的回调方法statusCallback.bind(this)
 * 回调方法返回的状态'success'和'error'
 */
import {React} from  './my-import';
import { Tag, Form, Input } from 'antd';
import '../css/cpt_identifycode-frame.css';
const FormItem = Form.Item;

class IdentityFrame extends React.Component {
    static defaultProps  = {
        a_max_size: 2,
        b_max_size: 2,
    };
    constructor(props){
        super(props);
        this.state = {
            'identity_str'  :   '',
            'identify_value'    :   '',
            'identify_status'   : ''
        };
        this.resetIdentifyStr = this.resetIdentifyStr.bind(this);
    }
    resetIdentifyStr(){
        var identity_str_a = Math.round(Math.random() * Math.pow(10, this.props.a_max_size));
        var identity_str_b = Math.round(Math.random() * Math.pow(10, this.props.b_max_size));
        this.setState({
            "identity_str": identity_str_a + " + " + identity_str_b,
            "identify_value": identity_str_a + identity_str_b,
            'identify_status'   : this.state.identify_status == 'success' ? 'error' : this.state.identify_status,
        });
    }
    componentWillMount(){
        this.resetIdentifyStr();
    }
    handleChange = (e)=>{
        if(e.target.value == this.state.identify_value && this.state.identify_status !== 'success'){
            this.setState({"identify_status": 'success'});
        }else{
            if(this.state.identify_status !== 'error'){
                this.setState({"identify_status": 'error'});
            }
        }
    }
    render(){
        return (
            <div style={{height:'50px'}}>
                <Tag className='identifycode_tag' onClick = {this.resetIdentifyStr} >{this.state.identity_str}</Tag>
                <FormItem className='identifycode_FormItem' validateStatus={this.state.identify_status} hasFeedback >
                    <Input className='identifycode_input' onKeyUp={this.handleChange} />
                </FormItem>
            </div>
        )
    }
}
export {IdentityFrame};