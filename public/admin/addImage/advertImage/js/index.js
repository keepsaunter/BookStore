/**
 * Created by ouchao on 2017/5/2.
 */
import { React, ReactDom, $, PATH } from  '../../../../js/my-import';
import { AdminMenu } from  '../../../js/cpt_menu';
import { AdvertImageFrame } from './cpt_detail-image-frame';
import '../../../css/common.css';

class AdvertImage extends React.Component{
    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div">
                    <AdminMenu selected_key="admin/addImage/advertImage" />
                </div>
                <div style={{width:'66%', paddingTop:'20px'}}>
                    <AdvertImageFrame />
                </div>
            </div>
        );
    }
}
ReactDom.render(<AdvertImage />, contain);