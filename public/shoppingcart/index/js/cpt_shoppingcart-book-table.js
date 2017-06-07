/**
 * Created by ouchao on 2017/5/13.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Table, InputNumber, message, Button, Icon, Popconfirm } from 'antd';
import '../css/cpt_shoppingcart-book-table.css';
class ShoppingcartBookTable extends React.Component {
    static defaultProps = {
        user_id: 1,
    }
    constructor(props){
        super(props);
        this.state = {
            page_now: 1,
            page_length: 12,
            total_count: 0,
            table_loading: true,
            rows_selected: [],
            total_price: 0,
            data: [],
            balance_btn_is_loading: false,
        }
    }
    componentWillMount(){
        this.getShoppingcart();
    }
    getShoppingcart(){
        this.setState({table_loading: true, rows_selected: [], total_price: 0,});
        $.get(
            PATH['_URL_']+'shoppingcart/index/getShoppingCart',
            {
                'page_now': this.state.page_now,
                'page_length': this.state.page_length,
            },
            (res)=>{
                this.setState({data: res.data, total_count: res.total_count, table_loading:false});
            }
        )
    }
    tableRowSelectChangeHandle(selectedRowKeys){
        this.state.rows_selected = selectedRowKeys;
        this.setState({total_price: this.balanceTotalPrice()});
    }
    balanceTotalPrice(){
        let { rows_selected, data} = this.state;
        let total_price = 0;
        for (let temp of data){
            if(rows_selected.indexOf(temp['book_id']) != -1){
                total_price += parseFloat(temp['real_total_price']);
            }
        }
        return total_price;
    }
    bookCountChangeHandle(book_id, val){
        let data = this.state.data;
        for(let i = 0; i < data.length; i++){
            if(data[i]['book_id'] == book_id){
                data[i]['real_total_price'] = val * data[i]['real_price'];
                data[i]['count'] = val;
            }
        }
        this.setState({total_price: this.balanceTotalPrice()});
        $.post(
            PATH['_URL_'] + "ShoppingCart/index/updateBookCount",
            {
                book_id: book_id,
                count: val,
            },
            (res)=>{
                if(res.status == 100){

                }else{
                    message.error(res.info);
                }
            }
        )
    }
    shoppingcartDelete(book_id){
        let flag = true;
        if(book_id == ''){
            book_id = this.state.rows_selected;
            if(book_id.length == 0){
                flag = false;
                message.warning("未选中任何条目！");
            }
        }
        if(flag){
            $.post(
                PATH['_URL_'] + 'shoppingcart/index/deleteShoppingCart',
                {
                    book_id: book_id,
                },
                (res)=>{
                    if(res.status == 100){
                        message.success(res['info']);
                        let { rows_selected } = this.state;

                        if(typeof book_id == "object"){
                            this.state.rows_selected = [];
                        }else{
                            let search_index = rows_selected.indexOf(book_id);
                            if(search_index > 0){
                                rows_selected.splice(search_index, 1);
                                this.state.rows_selected = rows_selected;
                            }
                        }
                        this.getShoppingcart();
                        this.setState({total_price: this.balanceTotalPrice()});
                    }else{
                        message.success(res['error']);
                    }
                }
            );
        }
    }
    addCollectHandle(book_id, price){
        $.redirectPost(
            PATH['_URL_']+'book/scanbook/addCollect',
            {
                book_id: book_id,
                price: price,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    let temp_data = this.state.data;
                    for(let i=0;i<temp_data.length; i++){
                        if(temp_data[i].book_id == book_id){
                            temp_data[i].is_collected = temp_data[i].is_collected == 1 ? 0 : 1;
                            break;
                        }
                    }
                    this.setState({data: temp_data});
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    tableChangeHandle(page){
        if(page.current != this.state.page_now){
            this.state.page_now = page.current;
        }
        this.getShoppingcart();
    }
    balanceHandle(){
        this.setState({balance_btn_is_loading: true});
        const { rows_selected } = this.state;
        $.post(
            PATH['_URL_'] + '/shoppingcart/index/balance',
            {
                book_ids: rows_selected
            },
            (res)=>{
                if(res.status == 100){
                    this.setState({balance_btn_is_loading: false});
                    location.href = PATH['_URL_'] + '/shoppingcart/createorder';
                }else{
                    message.error(res.info)
                }
            }
        )
    }
    render(){
        const { data, page_now, page_length, total_count, rows_selected, total_price, balance_btn_is_loading } = this.state;
        const columns_width_small = '100px';
        const columns_width = '120px';
        const columns = [
            {
                title: '缩略图',
                dataIndex: 'img_id',
                key: 'img_id',
                width:'10px',
                render: text => <img style={{width:'80px'}} src={PATH['_ROOT_'] + text} />,
            },
            {
                title: '名称',
                dataIndex: 'name',
                width: columns_width,
                key: 'name',
            }, {
                title: '价格',
                dataIndex: 'real_price',
                width: columns_width_small,
                key: 'real_price',
                render: (text) => <span>￥{text.toFixed(2)}</span>
            },{
                title: '数量',
                dataIndex: 'count',
                width: columns_width_small,
                key: 'count',
                render:(text, record) =>  <div onClick={(e)=>e.stopPropagation()}><InputNumber min={1} max={record['stock']} defaultValue={text} onChange={this.bookCountChangeHandle.bind(this, record['book_id'])} /><p style={{lineHeight:'26px'}}>库存{record['stock']}件</p></div>
            }, {
                title: '总价',
                dataIndex: 'real_total_price',
                width: columns_width,
                key: 'real_total_price',
                render:(text) => <span style={{color:'red'}}>￥{text.toFixed(2)}</span>
            },{
                title: '操作',
                dataIndex: 'operation',
                width: columns_width_small,
                key: 'operation',
                render:(text, record) =>
                    <div onClick={(e)=>e.stopPropagation()}>
                        {
                            record.is_collected == 0 ?
                                <p style={{lineHeight: '30px'}}>
                                    <a onClick={this.addCollectHandle.bind(this, record['book_id'], record['real_price'])}>加入收藏</a>
                                </p>
                                :
                                <p style={{lineHeight: '30px'}}>
                                    <a onClick={this.addCollectHandle.bind(this, record['book_id'], record['real_price'])}>取消收藏</a>
                                </p>
                        }
                        <p>
                            <Popconfirm title="Are you sure delete this shopping cart?" onConfirm={this.shoppingcartDelete.bind(this, record['book_id'])} okText="Yes" cancelText="No">
                                <a>删除</a>
                            </Popconfirm>
                        </p>
                    </div>
            }];
        return(
            <div>
                <div>
                    <Table
                        columns={columns}
                        rowKey = 'book_id'
                        dataSource={data}
                        onRowClick={(record)=>location.href = PATH['_URL_'] + 'book/bookDetail?book_id='+record.book_id}
                        loading={this.state.table_loading}
                        pagination = {{showQuickJumper: true, current:page_now, pageSize: page_length, total: total_count }}
                        rowSelection={{onChange:this.tableRowSelectChangeHandle.bind(this)}}
                        onChange={this.tableChangeHandle.bind(this)}
                    />
                </div>
                <div style={{height:'40px'}}>
                    <div className="balance_div">
                        <span style={{marginLeft:'10%',whiteSpace:'pre'}}>已选择 <span style={{fontSize:'16px', color:'red'}}>{rows_selected.length}</span> 件商品</span>
                        <span style={{marginLeft:'10%'}}>
                            <Popconfirm title="Are you sure delete shopping cart?" onConfirm={this.shoppingcartDelete.bind(this, '')} okText="Yes" cancelText="No">
                                <a>批量删除</a>
                            </Popconfirm>
                        </span>
                        <span style={{marginLeft:'34%',whiteSpace:'pre'}}>总计：  <span style={{fontSize:'16px', color:'red', display:'inline-block', minWidth:'120px'}}>￥{total_price.toFixed(2)}</span></span>
                        <span><Button size="large" loading={balance_btn_is_loading} style={{marginLeft:'1%',width:'14%'}} onClick={this.balanceHandle.bind(this)}><Icon type="laptop" />结算</Button></span>
                    </div>
                </div>
            </div>
        );
    }
}
export { ShoppingcartBookTable };