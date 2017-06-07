/**
 * Created by ouchao on 2017/5/18.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Table, Icon, Tooltip, Button, Input, Select, message } from 'antd';
import { OrderTableBooks } from './cpt_order-table-books';
import '../css/cpt_order-table.css';
const Search = Input.Search;
const Option = Select.Option;
const ButtonGroup = Button.Group;

class AdminOrderTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            expanded_row: [0],
            page_now: 1,
            page_length: 10,
            total_count: 0,
            status_filter: -1,
            search_value: '',
            table_order_by:'',
            table_is_loading: true,
        }
    }
    componentWillMount(){
        this.getOrderData();
    }
    getOrderData(){
        const { page_now, page_length, status_filter, search_value, table_order_by } = this.state;
        this.setState({table_is_loading: true});
        $.post(
            PATH['_URL_'] + 'admin/scanOrder/getOrder',
            {
                page_now: page_now,
                page_length: page_length,
                status_filter: status_filter,
                search_value: search_value,
                order_by: table_order_by,
            },
            (res)=>{
                this.setState({data: res['data'], total_count: res.total_length, table_is_loading: false});
            }
        )
    }
    expandeRowsChangeHandle(rows){
        if(rows.length > 1){
            rows.splice(0, 1);
        }
        this.setState({expanded_row: rows});
    }
    tableChange(page, filters, sorter){
        this.state.table_order_by = sorter.field + (sorter.order == 'descend' ? ' desc' : ' asc');
        this.getOrderData();
    }
    statusFilterChange(value){
        this.state.status_filter = value;
        this.state.page_now = 1;
        this.getOrderData();
    }
    searchValueChange(value){
        this.state.search_value = value;
        this.state.page_now = 1;
        this.getOrderData();
    }
    deleteOrderHandle(order_id){
        $.post(
            PATH['_URL_'] + 'admin/scanOrder/deleteOrder',
            {
                order_id: order_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    let temp_expanded_row = this.state.expanded_row;
                    let temp_data = this.state.data;
                    for (let i=0; i<temp_data.length; i++){
                        if(temp_data[i]['id'] == order_id){
                            if(temp_expanded_row.indexOf(i) != -1){
                                this.state.expanded_row = [];
                            }
                            break;
                        }
                    }
                    this.getOrderData();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    dealRejectedOrderHandle(order_id, is_agree){
        $.post(
            PATH['_URL_'] + 'admin/scanOrder/dealRejectedOrder',
            {
                order_id: order_id,
                is_agree: is_agree,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getOrderData();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    deliverOrderHandle(order_id){
        $.post(
            PATH['_URL_'] + 'admin/scanOrder/deliverOrder',
            {
                order_id: order_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getOrderData();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    render(){
        const { data, expanded_row, page_now, page_length, total_count, table_is_loading } = this.state;
        const columns = [
            {
                title: '订单号',
                dataIndex: 'order_identify',
                key: 'order_identify',
                sorter: true,
            },{
                title: '创建时间',
                dataIndex: 'add_time',
                key: 'add_time',
                sorter: true,
            },{
                title: '用户',
                dataIndex: 'user_name',
                key: 'user_name',
            },{
                title: '收件人',
                colSpan: 3,
                dataIndex: 'receiver_name',
                key: 'receiver_name',
            },{
                title: '收件人电话',
                dataIndex: 'receiver_tel',
                colSpan: 0,
                key: 'receiver_tel',
            },{
                title: '收件地址',
                colSpan: 0,
                dataIndex: 'receiver_address',
                key: 'receiver_address',
            },{
                title: '支付方式',
                dataIndex: 'pay_type_text',
                key: 'pay_type_text',
            },{
                title: '支付时间',
                dataIndex: 'pay_time',
                key: 'pay_time',
            },{
                title: '状态',
                dataIndex: 'status_info',
                key: 'status_info',
            },{
                title: '总价',
                dataIndex: 'total_price',
                key: 'total_price',
                render:(text) => <span style={{color:'red'}}>￥{text.toFixed(2)}</span>
            }, {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                render:(text, record) => {
                    if(record['status'] == 3 || record['status'] == 5 || record['status'] == 6){
                        return <div><Tooltip title="删除"><Button style={{width:'73px'}} onClick={this.deleteOrderHandle.bind(this, record['id'])}><Icon type="delete" /></Button></Tooltip></div>
                    }else if(record['status'] == 4){
                        return <div><ButtonGroup><Tooltip title="同意退货"><Button onClick={this.dealRejectedOrderHandle.bind(this, record['id'], true)}><Icon type="verticle-right" /></Button></Tooltip><Tooltip title="拒绝退货"><Button onClick={this.dealRejectedOrderHandle.bind(this, record['id'], false)}><Icon type="verticle-left" /></Button></Tooltip></ButtonGroup></div>
                    }else if(record['status'] == 1){
                        return <div><Tooltip title="发货"><Button style={{width:'73px'}} onClick={this.deliverOrderHandle.bind(this, record['id'])}><Icon type="export" /></Button></Tooltip></div>
                    }
                }
            }
        ];
        return (
            <div className="admin_order_table_div">
                <div>
                    <Select
                        showSearch
                        style={{ width: 200}}
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
                <div>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={this.searchValueChange.bind(this)}
                    />
                </div>
                <Table
                    columns={columns}
                    rowKey = 'id'
                    onChange={this.tableChange.bind(this)}
                    pagination={{showQuickJumper: true, current:page_now, pageSize:page_length, total:total_count }}
                    bordered
                    expandedRowRender={(recoder)=>{return  <OrderTableBooks data={recoder['book']} />}}
                    onExpandedRowsChange={this.expandeRowsChangeHandle.bind(this)}
                    expandedRowKeys = {expanded_row}
                    dataSource={data}
                    loading={table_is_loading}
                />
            </div>
        );
    }
}
export { AdminOrderTable };