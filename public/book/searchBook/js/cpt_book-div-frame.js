/**
 * Created by ouchao on 2017/5/11.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Card, Rate, Icon, Select,Input, Pagination, Spin, message, Button } from 'antd';
import '../css/cpt_book-div-frame.css';
const InputGroup = Input.Group;
const Option = Select.Option;
const Search = Input.Search;
const ButtonGroup = Button.Group;

class BookTable extends React.Component{
    static defaultProps = {
        search_val: $('#search_val').val(),
        type: $('#type').val(),
    }
    constructor(props){
        super(props);
        this.state = {
            page_now: 1,
            page_length: 10,
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
        const { search_val, type} = this.props;
        $.post(
            PATH['_URL_'] + 'book/searchBook/getBooks',
            {
                page_now: this.state.page_now,
                page_length: this.state.page_length,
                search_name_value: type == 0 ? search_val : '',
                search_author_value: type == 1 ? search_val : '',
                search_classification_id: '',
                order_by: '',
            },
            (res)=>{
                this.setState({data: res.data, total_count: res.total_count, is_loading: false});
            }
        )
    }
    pageChangeHandle(page){
        this.state.page_now = page;
        this.getBooks();
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
    render(){
        const { data, is_loading } = this.state;
        return (
            <div className="book_show_div">
                {
                    (()=>{
                        if(!is_loading){
                            if(data != ''){
                                return data.map((val, index)=>{
                                    return (
                                        <Card key={index} onClick={this.bookDetailHandle.bind(this, val['id'])} className="book_card" bodyStyle={{ padding:'18px 18px'}} style={{marginBottom:'10px'}}>
                                            <div className="book_img_div" style={{width:"11%", display:'inline-block'}}>
                                                <img alt="example" width="100%" src={PATH['_ROOT_'] + val['img_id']} />
                                            </div>
                                            <div className="book_info_div" style={{float:'right',width:'85%'}}>
                                                <p style={{ fontSize:'18px',lineHeight:'30px',fontWeight:'bold'}}>{val['name']}</p>
                                                <p style={{ fontSize:'14px',height:'40px', ineHeight:'20px',fontWeight:'100',color:'#323232',marginBottom:'10px'}}>{val['introduction']}</p>
                                                <div style={{borderTop:'solid 1px #eeeeee',lineHeight:'30px', marginBottom:'4px'}}>
                                                    作者：<span>{val['author']}</span>
                                                    <span style={{marginLeft:'2%'}}>出版社：<span>{val['edition']}</span></span>
                                                    <span><Rate style={{fontSize:'16px', marginLeft:'4%', marginTop:'-8px'}} disabled={true} allowHalf defaultValue={val['comment_level']} /></span>
                                                    <span style={{marginLeft:'1%'}}>{val['count_buy']}人购买</span>
                                                </div>
                                                <div className="btn_group">
                                                    <ButtonGroup style={{float:'left'}}>
                                                        <Button onClick={this.btnShoppingcartHandle.bind(this, val['id'], val['price'])} style={{fontSize:'16px'.button_group_font_size}}>
                                                            <Icon type="shopping-cart" />购物车
                                                        </Button>
                                                        <Button onClick={this.btnCollectHandle.bind(this, val['id'], val['price'])} style={{fontSize:'16px'.button_group_font_size}}>
                                                            <Icon type={val['is_collected']==1 ? "heart" : "heart-o"} />收藏
                                                        </Button>
                                                    </ButtonGroup>
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
                <div><Pagination style={{float:'right'}} onChange={this.pageChangeHandle.bind(this)} showQuickJumper={true} defaultPageSize={this.props.page_length} defaultCurrent={1} total={this.state.total_count} /></div>
            </div>
        );
    }
}
export { BookTable };