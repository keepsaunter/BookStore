/**
 * Created by ouchao on 2017/5/6.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { AdminMenu } from  '../../js/cpt_menu';
import { TrreeFrame } from './cpt_tree-frame';
import '../../css/common.css';
import '../css/index.css';


class EditClassify extends React.Component{
    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div">
                    <AdminMenu selected_key="admin/editClassify" />
                </div>
                <div className="classify_tree">
                    <TrreeFrame />
                </div>
            </div>
        );
    }
}
ReactDom.render(<EditClassify />, contain);