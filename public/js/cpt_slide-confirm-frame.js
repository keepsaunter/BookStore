/**
 * Created by ouchao on 2017/5/21.
 */
import {React, $} from  './my-import';
import '../css/cpt_slide-confirm-frame.css';
import { Icon } from 'antd';
class SlideConfirm extends React.Component {
    static defaultProps = {
        width: '400',
        height: '36',
        changeSlideChecked(){},
    }
    constructor(props){
        super(props);
        this.state = {
            base_clientx: '',
            is_checked: false,
        }
    }
    dragMouseDown(event){
        if(!this.state.is_checked){
            this.state.base_clientx = event.clientX;
        }
    }
    dragMouseMove(event){
        let temp_base_clientx = this.state.base_clientx;
        if(temp_base_clientx != '' && !this.state.is_checked){
            let temp_offset_x = event.clientX - temp_base_clientx;
            if(temp_offset_x < 0){
                temp_offset_x = 0;
            }
            if(temp_offset_x >= this.props.width-64){
                this.setState({is_checked: true});
                temp_offset_x = this.props.width-64;
                this.props.changeSlideChecked(this.state.is_checked);
            }
            $('#dragHandler').css('left', 2+temp_offset_x);
            $('#dragBg').css('width', temp_offset_x+'px');
        }
    }
    dragMouseUp(){
        if(!this.state.is_checked){
            this.setState({base_clientx:''});
            $('#dragHandler').css('left', '2px');
            $('#dragBg').css('width', '0px');
        }
    }
    render(){
        const { width, height } = this.props;
        const { is_checked } = this.state;
        return(
            <div id="dragContainer" style={{width: width + 'px', height: height + 'px'}}>
                <div id="dragBg" style={{height: (height - 4) + 'px'}}></div>
                <div id="dragText">{is_checked ?　"验证成功" : "向右滑动解锁"}</div>
                <div onMouseLeave={this.dragMouseUp.bind(this)} style={{height: (height - 4) + 'px'}} id="dragHandler" onMouseMove={this.dragMouseMove.bind(this)} onMouseUp={this.dragMouseUp.bind(this)} onMouseDown={this.dragMouseDown.bind(this)}><Icon  type={is_checked ? "check" : "double-right"} /></div>
            </div>
        )
    }
}
export { SlideConfirm };