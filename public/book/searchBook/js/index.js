/**
 * Created by ouchao on 2017/5/11.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { BookTable } from './cpt_book-div-frame';

class ClientSearchbook extends React.Component{
    static defaultProps = {
        search_val: $('#search_val').val(),
        type: $('#type').val(),
    }
    render(){
        return (
            <div style={{ minWidth:'1420px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                        <BookTable search_val={this.props.search_val} type={this.props.type} />
                </div>
            </div>
        );
    }
}
ReactDom.render(<ClientSearchbook />, contain);