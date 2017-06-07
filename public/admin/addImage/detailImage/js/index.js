/**
 * Created by ouchao on 2017/5/2.
 */
import { React, ReactDom, $, PATH } from  '../../../../js/my-import';
import { AdminMenu } from  '../../../js/cpt_menu';
import { DetailImageFrame } from './cpt_detail-image-frame';
import { Table } from 'antd';
import '../../../css/common.css';


class DetailImage extends React.Component{
    static defaultProps = {
        book_id: $('#book_id').val(),
    }
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount(){
        this.getDetail();
    }
    getDetail(){
        $.post(
            PATH['_URL_'] + 'admin/addImage/getBookDetail',
            {
                book_id: this.props.book_id,
            },
            (res)=>{
                this.setState({data: [res]});
            }
        )
    }
    render(){
        const { data } = this.state;
        const columns = [
            {
                title: '缩略图',
                dataIndex: 'img_id',
                key: 'img_id',
                render: text => <img style={{width:'60px'}} src={PATH['_ROOT_'] + text} />,
            },{
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },{
                title: '作者',
                dataIndex: 'author',
                key: 'author',
            },{
                title: '出版社',
                dataIndex: 'edition',
                key: 'edition',
            },{
                title: '分类',
                dataIndex: 'classification_id',
                key: 'classification_id',
            },{
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (text) => (
                    <span>￥{text.toFixed(2)}</span>
                ),
            },{
                title: '上架时间',
                dataIndex: 'add_datetime',
                key: 'add_datetime',
            }];
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div">
                    <AdminMenu selected_key="admin/addImage/detailImage" />
                </div>
                <div style={{width:'66%', paddingTop:'20px'}}>
                    <div style={{marginBottom:'20px'}}>
                        <Table bordered
                               columns={columns}
                               rowKey = 'id'
                               dataSource={data}
                               pagination = {false}
                        />
                    </div>
                    {
                        data.length > 0 ?
                            <div>
                                <DetailImageFrame book_id={data[0]['id']} />
                            </div>
                            : <div></div>
                    }
                </div>
            </div>
        );
    }
}
ReactDom.render(<DetailImage />, contain);