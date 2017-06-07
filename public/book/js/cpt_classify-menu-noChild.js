/**
 * Created by ouchao on 2017/5/11.
 */
import { React, $ } from  '../../js/my-import';
import '../css/cpt_classify-menu-noChild.css';

class ClassifyMenuNoChild extends React.Component {
    static defaultProps = {
        classification_id: '',
        classifyChangeHandle: '',
    }
    constructor(props){
        super(props);
        this.state = {
            classification_name: [],
            data: [],
        }
        this.getClassification();
    }
    getClassification(){
        $.post(
            'scanbook/getDirectClassify',
            {
                'id': this.props.classification_id,
            },
            (res)=>{
                this.setState({data: res.data, classification_name: res.name});
            }
        );
    }
    checkedClassify(classification_id){
        this.props.classifyChangeHandle(classification_id);
    }
    render(){
        const { classification_name, data } = this.state;
        return (
            <div id="classify_menu_noChild">
                <div style={{textAlign:'center'}}>
                    <span style={{fontSize:'15px'}}>{ classification_name.map((val, index)=>{
                        return (index == 0 ? <span key={index}>{val.name}</span> : <a key={index} onClick={this.checkedClassify.bind(this, val.id)}> | {val.name}</a>);
                    }) }</span>
                </div>
                {
                    data.map((val, index)=>{
                        return (
                            <div key={index}>
                                <div style={{width:'80%',margin:'auto',borderTop:'dashed 1px gray'}} onClick={this.checkedClassify.bind(this, val.id)}>
                                    <span style={{fontSize:'15px'}}>{val.name}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }
}
export { ClassifyMenuNoChild };