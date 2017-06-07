/**
 * Created by ouchao on 2017/5/2.
 */
import { React, ReactDom, $ } from  '../../../../js/my-import';
import { ImgcropFrame } from  '../../../../js/cpt_imgcrop-frame';
import { AdminMenu } from  '../../../js/cpt_menu';
import '../css/index.css';
import '../../../css/common.css';


class AddImage extends React.Component{
    render(){
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div">
                    <AdminMenu selected_key="admin/addImage/coverImage" />
                </div>
                <div style={{marginTop:'100px',background:'url("../../../data/upload/books/book.png") no-repeat',backgroundSize:'contain',marginLeft:'20%', width:'30%', maxWidth:'300px',height:'500px'}}>
                    {/*<ImgcropFrame />*/}
                    <div></div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<AddImage />, contain);