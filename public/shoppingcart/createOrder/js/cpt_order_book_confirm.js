/**
 * Created by ouchao on 2017/5/16.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Table } from 'antd';
class OrderBookConfirm extends React.Component {
    static defaultProps = {
        updateTotalPrice(){},
    }
    constructor(props){
        super(props);
        this.state = {
            data: [],
            total_price: 0,
            book_data_loading: true,
        }
    }
    componentWillMount(){
        this.getNewOrderBooks();
    }
    checkTotalPrice(total_price){
        this.setState({total_price: total_price});
        this.props.updateTotalPrice(total_price);
    }
    getNewOrderBooks(){
        this.setState({book_data_loading: true});
        $.redirectPost(
            PATH['_URL_'] + 'shoppingcart/createorder/getNewOrderBooks',
            (res)=>{
                let total_price = 0;
                for (let temp of res){
                    total_price += temp.real_total_price;
                }
                this.setState({data: res, book_data_loading: false});
                this.checkTotalPrice(total_price);
            }
        )
    }
    render(){
        const { data, total_price, book_data_loading } = this.state;
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
                dataIndex: 'real_price',
                key: 'real_price',
                render: (text) => <span>￥{text.toFixed(2)}</span>
            },{
                title: '数量',
                dataIndex: 'count',
                key: 'count',
            }, {
                title: '总价',
                dataIndex: 'real_total_price',
                key: 'real_total_price',
                render:(text) => <span style={{color:'red'}}>￥{text.toFixed(2)}</span>
            }
        ];
        const footer = (data)=>{
            return (
                <div>
                    <span><span style={{color:'red', fontSize:'16px', marginLeft:'20px'}}>{data.length}</span>件商品</span>
                    <span style={{float:'right',marginRight:'16%', color:'red', fontSize:'16px'}}>￥{total_price.toFixed(2)}</span>
                </div>);
        }
        return(
            <div>
                <Table
                    columns={columns}
                    rowKey = 'book_id'
                    pagination={false}
                    dataSource={data}
                    footer={footer}
                    loading={ book_data_loading }
                />
            </div>
        );
    }
}
export { OrderBookConfirm };