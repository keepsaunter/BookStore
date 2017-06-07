/**
 * Created by ouchao on 2017/5/11.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Card, Rate, Icon, Select,Input, Pagination, Spin, message, Checkbox } from 'antd';
import '../css/cpt_book-table-frame.css';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;

class BookTable extends React.Component{
    static defaultProps = {
        classification_id: '',
        page_length: 12,
    }
    constructor(props){
        super(props);
        this.state = {
            page_now: 1,
            search_name_value: '',
            search_author_value: '',
            search_classification_id: this.props.classification_id,
            search_type: 'name',
            order_by: '',
            total_count: 0,
            data: '',
            is_loading: true,
        }
        this.getBooks = this.getBooks.bind(this);
    }
    componentWillReceiveProps(pre){
        this.state.search_classification_id = pre.classification_id;
        this.getBooks();
    }
    componentWillMount(){
        this.getBooks();
    }
    getBooks(){
        this.setState({is_loading: true});
        $.post(
            PATH['_URL_'] + 'book/scanbook/getBooks',
            {
                page_now: this.state.page_now,
                page_length: this.props.page_length,
                search_name_value: this.state.search_name_value,
                search_author_value: this.state.search_author_value,
                search_classification_id: this.state.search_classification_id,
                order_by: this.state.order_by,
            },
            (res)=>{
                this.setState({data: res.data, total_count: res.total_count, is_loading: false});
            }
        )
    }
    searchTypeChangeHandle(val){
        this.state.search_type = val;
    }
    searchHandle(val){
        this.state.search_type == "name" ? this.state.search_name_value = val : this.state.search_author_value = val;
        this.getBooks();
        this.state.search_name_value = '';
        this.state.search_author_value = '';
    }
    pageChangeHandle(page){
        this.state.page_now = page;
        this.getBooks();
    }
    mouseEnterHandle(e){
        e.stopPropagation();
        $(e.target).find('.book_btn_group_div').animate({'height':'28px'}, 300);
    }
    mouseOutHandle(e){
        e.stopPropagation();
        $(e.target).find('.book_btn_group_div').animate({'height':'0px'}, 300);
    }
    btnShoppingcartHandle(book_id, price, e){
        e.stopPropagation();
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
    btnCollectHandle(book_id, price, e){
        e.stopPropagation();
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
                        if(temp_data[i].id == book_id){
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
    bookDetailHandle(book_id){
        location.href = PATH['_URL_'] + 'book/bookDetail?book_id='+book_id;
    }
    rateOrderChange(e){
        if(!$(e.target).hasClass('is_selected')){
            $(e.target).addClass('is_selected');
            this.state.order_by = 'comment_level desc';
        }else{
            $(e.target).removeClass('is_selected');
            this.state.order_by = '';
        }
        this.state.page_now = 1;
        this.getBooks();
    }
    render(){
        const { data, is_loading } = this.state;
        return (
            <div className="book_show_div" style={{height:'100%'}}>
                <div className="search_order_div">
                    <span onClick={this.rateOrderChange.bind(this)}>人气</span>
                    <InputGroup compact style={{width:'40%', float:'right',marginBottom:'10px'}}>
                        <Select defaultValue="name"  style={{width:'30%'}} onChange={this.searchTypeChangeHandle.bind(this)}>
                            <Option value="name">搜书名</Option>
                            <Option value="author">搜作者</Option>
                        </Select>
                        <Search
                            placeholder="input search text"
                            style={{ width:'70%', float:'right' }}
                            onSearch={this.searchHandle.bind(this)}
                        />
                    </InputGroup>
                </div>
                <div style={{clear:'right'}}>
                    {
                        (()=>{
                            if(!is_loading){
                                if(data != ''){
                                    return data.map((val, index)=>{
                                        return (
                                            <Card key={index} onClick={this.bookDetailHandle.bind(this, val['id'])} className="book_card" bodyStyle={{ padding: 0 }} onMouseEnter={this.mouseEnterHandle} onMouseLeave={this.mouseOutHandle}>
                                                <div className="book_img_div">
                                                    <img alt="example" width="100%" src={PATH['_ROOT_'] + val['img_id']} />
                                                </div>
                                                <div className="book_info_div">
                                                    <div>
                                                        <div style={{width:'100%'}}><span style={{float:'left',fontSize:'18px',color:'red'}}>￥{val['price'].toFixed(2)}</span><span style={{float:'right',marginTop:'6px',color:'#888888'}}>{val['count_buy']}人购买</span></div>
                                                        <div className="book_btn_group_div">
                                                            <div style={{width:'60%'}} onClick={this.btnShoppingcartHandle.bind(this, val['id'], val['price'])}>
                                                                <Icon type="shopping-cart" />购物车
                                                            </div>
                                                            <div style={{width:'40%'}} onClick={this.btnCollectHandle.bind(this, val['id'], val['price'])}><Icon type={val['is_collected']==1 ? "heart" : "heart-o"} />收藏</div>
                                                        </div>
                                                    </div>
                                                    <div><Rate disabled allowHalf={true} defaultValue={val['comment_level']} style={{width:'100%'}} /></div>
                                                    <div>
                                                        <h3 style={{clear:'both',
                                                            overflow:'hidden',
                                                            textOverflow:'ellipsis',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient:'vertical'}}>{val['name']}</h3>
                                                        <p>{val['author']}</p>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    });
                                }
                            }else {
                                return <Spin size="large" style={{margin:'200px 47%'}} />
                            }
                        })()
                    }
                </div>
                <div><Pagination style={{float:'right'}} onChange={this.pageChangeHandle.bind(this)} showQuickJumper={true} defaultPageSize={this.props.page_length} defaultCurrent={1} total={this.state.total_count} /></div>
            </div>
        );
    }
}
export { BookTable };