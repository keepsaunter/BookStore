/**
 * Created by ouchao on 2017/5/17.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Card, Icon, Collapse, Table, Pagination, Spin, Popconfirm, message, Select, Button, Tooltip, Modal, Input, Tag, Rate } from 'antd';
import { ImageUpload } from '../../../js/cpt_image_upload';
import '../css/cpt_myorder-table.css';
const Panel = Collapse.Panel;
const Option = Select.Option;

class MyOrderTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page_now: 1,
            page_length: 10,
            total_length: 0,
            table_is_loading: true,
            status_filter: -1,
            comment_modal_visible: false,
            comment_book_id: '',
            comment_file_list: [],
            comment_text: '',
            comment_tags:[],
            comment_select_tags: [],
            comment_level: 0,
        }
    }
    componentWillMount(){
        this.getOrders();
    }
    getOrders(){
        const { page_now, page_length, status_filter } = this.state;
        this.setState({table_is_loading: true});
        $.redirectPost(
            PATH['_URL_'] + 'personal/myorder/getOrders',
            {
                page_now: page_now,
                page_length: page_length,
                status_filter: status_filter,
            },
            (res)=>{
                let data = res['data'];
                for (let i =0;i<data.length;i++){
                    for(let j=0;j<data[i]['book'].length;j++){
                        data[i]['book'][j]['order_status'] = data[i]['status'];
                    }
                }
                this.setState({data: data, total_length: res['total_length'], table_is_loading: false, comment_tags: res['comment_tags']});
            }
        )
    }
    pageChangeHandle(page){
        this.state.page_now = page;
        this.getOrders();
    }
    deleteOrderHandle(order_id){
        $.redirectPost(
            PATH['_URL_'] + 'personal/myorder/deleteOrder',
            {
                order_id: order_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getOrders();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    statusFilterChange(value){
        this.state.status_filter = value;
        this.state.page_now = 1;
        this.getOrders();
    }
    commentBook(val,e){
        e.stopPropagation();
        this.state.comment_book_id = val;
        this.setState({comment_modal_visible: true});
    }
    saveCommentHandle(){
        let formData = new FormData();
        const { comment_file_list, comment_select_tags, comment_text, comment_book_id, comment_level } = this.state;
        formData.append('tag', comment_select_tags);
        formData.append('content', comment_text);
        formData.append('book_id', comment_book_id);
        formData.append('level', comment_level);
        for (let i =0; i<comment_file_list.length; i++){
            formData.append('comment_img[]', comment_file_list[i]['originFileObj']);
        }
        $.ajax({
            url: PATH['_URL_'] + 'personal/myorder/commentBook' ,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.closeCommentModal();
                }else{
                    if(res.status == 302){
                        location.href = PATH['_URL_'] + 'login/login';
                    }else{
                        message.error(res.info);
                    }
                }
            },
            error: function (res) {
                message.error(res.info);
            }
        });
    }
    closeCommentModal(){
        this.setState({comment_file_list:[], comment_select_tags:[], comment_modal_visible: false, comment_level: 0});
        this.refs.comemnt_img_upload.reset();
    }
    setFileList(file_list){
        this.state.comment_file_list=file_list;
    }
    selectCommentTags(tag_id){
        let temp = this.state.comment_select_tags;
        let p = temp.indexOf(tag_id)
        p == -1 ? temp.push(tag_id) : temp.splice(p, 1);
        this.setState({comment_select_tags: temp});
    }
    setCommentLevel(value){
        this.setState({comment_level: value});
    }
    applyRejectedHandle($order_id){
        $.redirectPost(
            PATH['_URL_'] + 'personal/myOrder/applyRejected',
            {
                order_id: $order_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getOrders();
                }else{
                    message.success(res.info);
                }
            }
        )
    }
    receiveOrderHandle($order_id){
        $.redirectPost(
            PATH['_URL_'] + 'personal/myOrder/receiveOrder',
            {
                order_id: $order_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getOrders();
                }else{
                    message.success(res.info);
                }
            }
        )
    }
    bookTableRowClickHandle(record){
        location.href = PATH['_URL_'] + 'book/bookDetail?book_id='+record.book_id;
    }
    render(){
        const { data, page_now, page_length, total_length, table_is_loading, comment_tags, comment_select_tags, comment_level } = this.state;
        const columns = [
            {
                title: '缩略图',
                dataIndex: 'img_id',
                key: 'img_id',
                render: text => <img style={{width:'40px'}} src={PATH['_ROOT_'] + text} />,
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (text) => <span>￥{text.toFixed(2)}</span>
            },{
                title: '数量',
                dataIndex: 'count',
                key: 'count',
            }, {
                title: '总价',
                dataIndex: 'total_price',
                key: 'total_price',
                render:(text) => <span style={{color:'red'}}>￥{text.toFixed(2)}</span>
            }, {
                title: 'operation',
                dataIndex: 'operation',
                key: 'operation',
                render:(text, record) => {
                    if(record['order_status'] > 2){
                        return <div onClick={this.commentBook.bind(this, record['book_id'])}><Tooltip title="评论"><Button><Icon type="message" /></Button></Tooltip></div>
                    }
                }
            }
        ];

        return (
            <div className="myorder_table_div">
                <div>
                    <Select
                        showSearch
                        style={{ width: 200,float:'right', marginBottom:'10px'}}
                        placeholder="Select a person"
                        onChange = {this.statusFilterChange.bind(this)}
                        optionFilterProp="children"
                        defaultValue="-1"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="-1">全部</Option>
                        <Option value="0">未支付</Option>
                        <Option value="1">已支付</Option>
                        <Option value="2">已发货</Option>
                        <Option value="3">已收货</Option>
                        <Option value="4">退货中</Option>
                        <Option value="5">已退货</Option>
                    </Select>
                </div>
                {

                    (()=> {
                        if (table_is_loading) {
                            return (
                                <div style={{width:'100%', padding:'20% 50%'}}>
                                    <Spin size="large"/>
                                </div>
                            )
                        } else {
                            return data.map((val, index)=>{
                                return (
                                    <Card style={{marginBottom:'16px'}} className="myorder_table_card" key={index} title={
                                        <span>
                                            <span>{val['add_time']}</span><span style={{marginLeft:'4%'}}>订单号：{val['order_identify']}</span><span style={{marginLeft:'30%', fontWeight:'100'}}>状态：<span style={{color:'#108EED'}}>{val['status_info']}</span></span>
                                        </span>
                                    } extra={
                                        <div>
                                            {
                                                (()=>{
                                                    if(val['status'] == 2) return(
                                                        <Popconfirm title="Are you sure receive order?" onConfirm={this.receiveOrderHandle.bind(this, val['id'])} okText="Yes" cancelText="No">
                                                            <a style={{marginRight:'10px'}}><Tooltip title="确认收货"><Icon style={{fontSize:'18px'}} type="tablet" /></Tooltip></a>
                                                        </Popconfirm>
                                                    )
                                                })()
                                            }
                                            {
                                                (()=>{
                                                    if(val['status'] == 1 || val['status'] == 2 || val['status'] == 3) return(
                                                        <Popconfirm title="Are you sure apply rejected?" onConfirm={this.applyRejectedHandle.bind(this, val['id'])} okText="Yes" cancelText="No">
                                                            <a style={{marginRight:'10px'}}><Tooltip title="申请退货"><Icon style={{fontSize:'18px'}} type="solution" /></Tooltip></a>
                                                        </Popconfirm>
                                                    )
                                                })()
                                            }
                                            {
                                                (()=>{
                                                    if(val['status'] == 0 || val['status'] == 3 || val['status'] == 5 || val['status'] == 6) return(
                                                        <Popconfirm title="Are you sure delete this order?" onConfirm={this.deleteOrderHandle.bind(this, val['id'])} okText="Yes" cancelText="No">
                                                            <a><Icon style={{fontSize:'18px'}} type="delete" /></a>
                                                        </Popconfirm>
                                                    )
                                                })()
                                            }

                                        </div>
                                    }>
                                        <Collapse defaultActiveKey={['1', '2']}>
                                            <Panel header="商品" key="1">
                                                <Table
                                                    columns={columns}
                                                    rowKey = 'book_id'
                                                    pagination={false}
                                                    showHeader={false}
                                                    onRowClick={this.bookTableRowClickHandle.bind(this)}
                                                    dataSource={val['book']}
                                                />
                                            </Panel>
                                            <Panel header="收件人信息" key="2" className="receiver_info_panel">
                                                <span>{val['receiver_name']}</span><span>{val['receiver_tel']}</span><span>{val['receiver_address']}</span>
                                            </Panel>
                                        </Collapse>
                                    </Card>
                                )
                            })
                        }
                    })()
                }
                <Pagination style={{float:'right', paddingTop:'10px'}} onChange={this.pageChangeHandle.bind(this)} current={page_now} pageSize={page_length} total={total_length} />
                <div>
                    <Modal
                        title="商品评价"
                        wrapClassName="vertical-center-modal"
                        visible={this.state.comment_modal_visible}
                        okText="发表"
                        onOk={this.saveCommentHandle.bind(this)}
                        onCancel={this.closeCommentModal.bind(this)}
                    >
                        <div style={{paddingBottom:'10px', borderBottom:'1px solid #eeeeee'}}>
                            {
                                comment_tags.map((val, index)=>{
                                    return <Tag key={index} style={comment_select_tags.indexOf(val.id) == -1?{}:{borderColor:'red'}} onClick={this.selectCommentTags.bind(this, val.id)}>{val.value}</Tag>
                                })
                            }
                        </div>
                        <Rate style={{ marginBottom:'10px'}} allowHalf value={comment_level} onChange={this.setCommentLevel.bind(this)} />
                        <ImageUpload ref="comemnt_img_upload" setFileList={this.setFileList.bind(this)} maxLength={3} />
                        <Input onChange={(e)=>this.setState({comment_text: e.target.value})} type="textarea" placeholder="Basic usage" />
                    </Modal>
                </div>
            </div>
        );
    }
}
export { MyOrderTable };