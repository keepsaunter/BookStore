/**
 * Created by ouchao on 2017/5/12.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { BookDetail } from './cpt_book-detail-frame';

class ClientBookDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            book_id: $('#book_id').val(),
        }
    }
    render(){
        return (
            <div style={{ minWidth:'1420px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                    <BookDetail book_id={ this.state.book_id } />
                </div>
            </div>
        );
    }
}
ReactDom.render(<ClientBookDetail />, contain);