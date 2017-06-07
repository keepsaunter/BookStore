/**
 * Created by ouchao on 2017/5/20.
 */
import { React, $, PATH } from  '../../../../js/my-import';
import { ImageUpload } from '../../../../js/cpt_image_upload';
import { PolygonTitle } from '../../../../js/cpt_polygon-title';
import { Button, Icon, message, Popconfirm, Input, Checkbox } from 'antd';
import '../css/cpt_detail-image-frame.css';
class AdvertImageFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            file_list: [],
            advert_title: '',
        }
    }
    componentWillMount(){
        this.getAdvertImage();
    }
    setFileList(file_list){
        this.state.file_list = file_list;
    }
    getAdvertImage(){
        $.post(
            PATH['_URL_'] + 'admin/addImage/getAdvertImage' ,
            (res)=>{
                console.log(res);
                this.setState({data: res});
            }
        )
    }
    uploadDetailImage(){
        let form_data = new FormData();
        form_data.append('title', this.state.advert_title);
        form_data.append('advert_img', this.state.file_list[0].originFileObj);
        $.ajax({
            url: PATH['_URL_'] + 'admin/addImage/addAdvertImage' ,
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
                    this.getAdvertImage();
                }else{
                    message.error(res.info);
                }
            },
            error: (res)=>{
                message.error(res);
            }
        });
    }
    deleteAdvertImageHandle(advert_id){
        $.post(
            PATH['_URL_'] + 'admin/addImage/deleteAdvertImage' ,
            {
                advert_id: advert_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    let temp_data = this.state.data;
                    for(let i=0;i<temp_data.length; i++){
                        if(temp_data[i]['id'] == advert_id){
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
    changeSelectHandle(advert_id, e){
        let status = e.target.checked ? 1 : 0;
        $.post(
            PATH['_URL_'] + 'admin/addImage/updateAdvertImageSelect',
            {
                advert_id: advert_id,
                status: status,
            },
            (res)=>{
                if(res.status == 100){
                    let temp_data = this.state.data;
                    for(let i=0;i<temp_data.length; i++){
                        if(temp_data[i]['id'] == advert_id){
                            temp_data[i]['status'] = status;
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
    titleChangeHandle(e){
        this.state.advert_title = e.target.value;
    }
    render(){
        const { data } = this.state;
        return (
            <div>
                <PolygonTitle title="已有广告图" />
                {
                    data.map((val, index)=>{
                        return (
                            <div key={index} style={{display:'inline-block', position:'relative',width:'48%', marginBottom: '38px', marginLeft:'1%'}}>
                                <img style={{width:'100%', boxShadow: '6px 6px 4px #B4B4B4'}} src={PATH['_ROOT_'] + val['img_src']} />
                                <div style={{textAlign:'center', cursor:'pointer',fontSize:'16px'}}>
                                    <Checkbox defaultChecked={val.status == 1} onChange={this.changeSelectHandle.bind(this, val.id)}>是否显示</Checkbox>
                                    <span style={{marginRight:'10px'}}>{val['title']}</span>
                                    <Popconfirm title="Are you sure delete this image?" onConfirm={this.deleteAdvertImageHandle.bind(this, val['id'])} okText="Yes" cancelText="No">
                                        <Icon type="delete" />
                                    </Popconfirm>
                                </div>
                            </div>
                        )
                    })
                }
                <PolygonTitle title="添加广告图" />
                {
                    data.length < 16 ?
                        <div style={{marginLeft:'1%'}}>
                            <div style={{marginBottom:'10px', fontWeight:'100'}}>
                                <p>广告图大小为700x310</p>
                                <p>最多只能有十六张广告图</p>
                            </div>
                            <ImageUpload maxLength={1} ref="detail_image_upload" setFileList={this.setFileList.bind(this)} />
                            <div style={{paddingTop:'4px'}}>
                                <Input onChange={this.titleChangeHandle.bind(this)} placeholder="Advert Title" style={{width:'300px',display:'block',marginBottom:'4px',height:'32px'}} />
                                <Button onClick={this.uploadDetailImage.bind(this)} style={{width:'94px'}} size="large"><Icon type="upload" /></Button>
                            </div>
                        </div>
                        : <div style={{marginBottom:'10px',marginLeft:'1%'}}><p>最多只能有十六张广告图</p></div>
                }
            </div>
        )
    }
}
export { AdvertImageFrame };