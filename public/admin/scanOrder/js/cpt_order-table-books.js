/**
 * Created by ouchao on 2017/5/18.
 */
import { React, PATH } from  '../../../js/my-import';
import { Table } from 'antd';
import '../css/cpt_order-table-books.css';
class OrderTableBooks extends React.Component {
    static defaultProps = {
        data:[],
    }
    render(){
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
            }
        ];
        return (
            <div>
                <Table
                    className="order_books_table"
                    columns={columns}
                    rowKey = 'book_id'
                    pagination={false}
                    showHeader={false}
                    dataSource={this.props.data}
                />
            </div>
        )
    }
}
export { OrderTableBooks };