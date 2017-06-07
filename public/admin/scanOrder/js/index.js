/**
 * Created by ouchao on 2017/5/18.
 */
import { React, ReactDom } from  '../../../js/my-import';
import { AdminMenu } from  '../../js/cpt_menu';
import { AdminOrderTable } from './cpt_order-table';
import '../../css/common.css';


class ScanOrder extends React.Component{
    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div" style={{marginRight:'5%'}}>
                    <AdminMenu selected_key="admin/scanOrder" />
                </div>
                <div className="book_div" style={{width:'75%',marginRight:'0px', paddingTop:'20px'}}>
                    <AdminOrderTable />
                </div>
            </div>
        );
    }
}
ReactDom.render(<ScanOrder />, contain);