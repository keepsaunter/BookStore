/**
 * Created by ouchao on 2017/5/20.
 */
import { React, $, PATH } from  '../../../../js/my-import';
import { ImageUpload } from '../../../../js/cpt_image_upload';
import { PolygonTitle } from '../../../../js/cpt_polygon-title';
import { Button, Icon, message, Popconfirm } from 'antd';
import '../css/cpt_detail-image-frame.css';
class DetailImageFrame extends React.Component {
    static defaultProps = {
        book_id: 0,
    }
    constructor(props){
        super(props);
        this.state = {
            data: [],
            file_list: [],
        }
    }
    componentWillMount(){
        this.getDetailImage();
    }
    setFileList(file_list){
        this.state.file_list = file_list;
    }
    getDetailImage(){
        $.post(
            PATH['_URL_'] + 'admin/addImage/getDetailImage' ,
            {
                book_id: this.props.book_id,
            },
            (res)=>{
                this.setState({data: res});
            }
        )
    }
    uploadDetailImage(){
        let form_data = new FormData();
        form_data.append('book_id', this.props.book_id);
        for(let val of this.state.file_list){
            form_data.append('detail_img[]', val.originFileObj);
        }
        $.ajax({
            url: PATH['_URL_'] + 'admin/addImage/addDetailImage' ,
            type: 'POST',
            data: form_data,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.state.file_list = [];
                    this.refs['detail_image_upload'].reset();
                    this.getDetailImage();
                }else{
                    message.error(res.info);
                }
            },
            error: (res)=>{
                message.error(res);
            }
        });
    }
    deleteDetailImageHandle(img_id){
        $.post(
            PATH['_URL_'] + 'admin/addImage/deleteDetailImage' ,
            {
                book_id: this.props.book_id,
                img_id: img_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    let temp_data = this.state.data;
                    for(let i=0;i<temp_data.length; i++){
                        if(temp_data[i]['id'] == img_id){
                            temp_data.splice(i, 1);
                            this.setState({data: temp_data});
                            break;
                        }
                    }
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    render(){
        const { data } = this.state;
        return (
            <div>
                <PolygonTitle title="已有细节图" />
                {
                    data.map((val, index)=>{
                        return (
                            <div key={index} style={{display:'inline-block', position:'relative',width:'200px', marginBottom: '38px', marginLeft:'1%'}}>
                                <img style={{width:'200px', boxShadow: '6px 6px 4px #B4B4B4'}} src={PATH['_ROOT_'] + val['value']} />
                                <div style={{position:'absolute',left:'46%', cursor:'pointer'}}>
                                    <Popconfirm title="Are you sure delete this image?" onConfirm={this.deleteDetailImageHandle.bind(this, val['id'])} okText="Yes" cancelText="No">
                                        <Icon type="delete" />
                                    </Popconfirm>
                                </div>
                            </div>
                        )
                    })
                }
                <PolygonTitle title="添加细节图" />
                {
                    data.length < 5 ?
                        <div style={{marginLeft:'1%'}}>
                            <div style={{marginBottom:'10px', fontWeight:'100'}}>
                                <p>细节图大小为400x400</p>
                                <p>最多只能有五张细节图</p>
                            </div>
                            <ImageUpload maxLength={5-data.length} ref="detail_image_upload" setFileList={this.setFileList.bind(this)} />
                            <div>
                                <Button onClick={this.uploadDetailImage.bind(this)} style={{width:'94px'}} size="large"><Icon type="upload" /></Button>
                            </div>
                        </div>
                        : <div style={{marginBottom:'10px',marginLeft:'1%'}}><p>最多只能有五张细节图</p></div>
                }

            </div>
        )
    }
}
export { DetailImageFrame };