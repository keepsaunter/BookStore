/**
 * Created by ouchao on 2017/5/21.
 */
import { React, PATH, $ } from  '../../../js/my-import';
import { Table, Icon, Tooltip, Button, Popconfirm, message } from 'antd';
const ButtonGroup = Button.Group;

class MyCollect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page_now: 1,
            page_length: 10,
            total_length: 0,
            table_is_loading: true,
        }
    }
    componentWillMount(){
        this.getCollected();
    }
    getCollected(){
        this.setState({table_is_loading: true});
        const { page_now, page_length } = this.state;
        $.redirectPost(
            PATH['_URL_'] + 'personal/PersonalCollect/getCollected',
            {
                page_now: page_now,
                page_length: page_length,
            },
            (res)=>{
                this.setState({data: res.data, total_length: res.total_length, table_is_loading: false});
            }
        )
    }
    deleteCollect(book_id){
        $.post(
            PATH['_URL_'] + 'personal/PersonalCollect/deleteCollected',
            {
                book_id: book_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getCollected();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    addShoppingCart(book_id, price){
        $.redirectPost(
            PATH['_URL_']+'book/scanbook/addShoppingCart',
            {
                book_id: book_id,
                price: price,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    window.open(PATH['_URL_']+'shoppingcart', 'ShoppingCart');
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    render(){
        const { page_now, page_length, total_count, data, table_is_loading } = this.state;
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
            },
            {
                title: '介绍',
                dataIndex: 'introduction',
                width: 200,
                key: 'introduction',
                render: (text) => <span style={{display:'-webkit-box',WebkitBoxOrient:'vertical',WebkitLineClamp:3,overflow:'hidden'}}>{text}</span>
            }, {
                title: '价格',
                dataIndex: 'real_price',
                key: 'real_price',
                render: (text) => <span style={{color:'red'}}>￥{text.toFixed(2)}</span>
            },
            {
                title: '添加时间',
                dataIndex: 'add_time',
                key: 'add_time',
            },{
                title: '操作',
                dataIndex: 'operation',
                width:120,
                key: 'operation',
                render:(text, record) => {
                    return (
                        <ButtonGroup onClick={(e)=>e.stopPropagation()}>
                            <Tooltip title="删除">
                                <Popconfirm title="Are you sure delete this collected?" onConfirm={this.deleteCollect.bind(this, record['book_id'], record['real_price'])} okText="Yes" cancelText="No">
                                    <Button style={{width:'50px'}}>
                                        <Icon type="delete" />
                                    </Button>
                                </Popconfirm>
                            </Tooltip>
                            <Tooltip title="加入购物车">
                                <Button style={{width:'50px'}} onClick={this.addShoppingCart.bind(this, record['book_id'], record['real_price'])}>
                                    <Icon type="shopping-cart" />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                    )
                }
                }
        ];
        return(
            <div>
                <Table
                    columns={columns}
                    rowKey = 'book_id'
                    loading={table_is_loading}
                    pagination={{showQuickJumper: true, current:page_now, pageSize:page_length, total:total_count }}
                    onRowClick={(record)=>location.href = PATH['_URL_'] + 'book/bookDetail?book_id='+record.book_id}
                    dataSource={data}
                />
            </div>
        )
    }
}
export { MyCollect };