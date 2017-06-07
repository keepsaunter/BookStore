/**
 * Created by ouchao on 2017/5/8.
 */
import { React, ReactDom } from  '../../../js/my-import';
import { AdminMenu } from  '../../js/cpt_menu';
import { BookFrame } from './cpt_book-frame';
import '../../css/common.css';


class ScanBook extends React.Component{
    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div" style={{marginRight:'5%'}}>
                    <AdminMenu selected_key="admin/scanBook" />
                </div>
                <div className="book_div" style={{width:'75%',marginRight:'0px', paddingTop:'20px'}}>
                    <BookFrame />
                </div>
            </div>
        );
    }
}
ReactDom.render(<ScanBook />, contain);