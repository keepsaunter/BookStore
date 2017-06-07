/**
 * Created by ouchao on 2017/5/11.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { ClassifyMenuNoChild } from '../../js/cpt_classify-menu-noChild';
import { BookTable } from './cpt_book-table-frame';

class ClientScanbook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'classification_id': $("#classification_id").val(),
            'checked_classification_id': $("#classification_id").val(),
        }
    }
    classifyChangeHandle(classification_id){
        this.setState({checked_classification_id: classification_id});
    }
    render(){
        return (
            <div style={{ minWidth:'1502px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                    <div style={{width:'17%', float:'left'}}>
                        <ClassifyMenuNoChild classification_id={this.state.classification_id} classifyChangeHandle={this.classifyChangeHandle.bind(this)} />
                    </div>
                    <div style={{width:'83%', float:'right'}}>
                        <BookTable classification_id={this.state.checked_classification_id} />
                    </div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<ClientScanbook />, contain);