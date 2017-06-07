/**
 * Created by ouchao on 2017/5/18.
 */
import { React, $, PATH } from  './my-import';
import { Card, Icon, Modal, Upload } from 'antd';
import '../css/cpt_image_upload.css';
class ImageUpload extends React.Component{
    static defaultProps = {
        setFileList(){},
        maxLength: 3,
    }
    constructor(props){
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
        }
    }
    reset = ()=>{
        this.setState({previewImage: '', fileList:[]});
    }
    handlePreview = (file) => {
        console.log(file);
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange({ fileList }) {
        this.setState({fileList});
        this.props.setFileList(fileList);
    }
    handleCancel(){
        this.setState({previewVisible: false});
    }
    render(){
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { previewVisible, previewImage, fileList } = this.state;
        return(
            <div className="image_upload_div">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview.bind(this)}
                    customRequest={null}
                    onChange={this.handleChange.bind(this)}
                >
                    {fileList.length >= this.props.maxLength ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
export { ImageUpload };