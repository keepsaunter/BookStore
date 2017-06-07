/**
 * Created by ouchao on 2017/5/10.
 */
import { React, $ } from  '../../js/my-import';
import '../css/cpt_classify-menu.css';

class ClassifyMenu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
        this.getData();
    }
    getData(){
        $.get(
            'homepage/getDirectClassify',
            (res)=>{
                this.setState({data: res});
            }
        );
    }
    render(){
        const { data } = this.state;
        const class_click_url = '../book/Scanbook'
        return (
            <div id="classify_menu">
                <div style={{fontSize:'20px',height:'36px',backgroundColor:'#eeeeee',textAlign:'center',borderTopRightRadius:'6px',borderTopLeftRadius:'6px'}}>
                    全部分类
                </div>
                {
                    data.map((val, index)=>{
                        return (
                            val.child.length > 0 ?
                                <div key={index}>
                                    <span style={{fontSize:'15px', marginLeft:'4px'}}>{val.name}</span>
                                    <div>
                                        <span style={{marginLeft:'4px'}}>
                                        {
                                            val.child.map((_val, _index)=>{
                                                return (_index == 0 ? <a href={class_click_url+"?cid="+_val.id} key={_index}>{_val.name}</a> : <a href={class_click_url+"?cid="+_val.id} key={_index}> | {_val.name}</a>);
                                            })
                                        }
                                        </span>
                                    </div>
                                </div>
                            :   <div key={index}>
                                    <span style={{fontSize:'15px'}}><a>val.name</a></span>
                                </div>
                        )
                    })
                }
            </div>
        )
    }
}
export { ClassifyMenu };