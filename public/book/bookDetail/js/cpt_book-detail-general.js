/**
 * Created by ouchao on 2017/5/13.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Rate, Button, Icon, InputNumber, message } from 'antd';
import '../css/cpt_book-detail-general.css';
const ButtonGroup = Button.Group;
class BookDetailGeneral extends React.Component {
    static defaultProps = {
        data: '',
    }
    constructor(props){
        super(props);
        this.state = {
            shopping_cart_count: 1,
            showing_detail_img: '',
            is_collected: '',
        }
    }
    componentWillUpdate(new_props, new_state){
        if(new_state.is_collected == ''){
            this.state.is_collected = new_props.data['is_collected'];
        }
    }
    btnShoppingcart(){
        $.redirectPost(
            PATH['_URL_']+'book/bookDetail/addShoppingCart',
            {
                book_id: this.props.data.id,
                price: this.props.data.price,
                count: this.state.shopping_cart_count,
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
                    this.setState({is_collected: this.state.is_collected == 1 ? 0 : 1})
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    changeDetailImg(val){
        this.setState({showing_detail_img: val});
    }
    render(){
        const { data } = this.props;
        const { showing_detail_img, is_collected } = this.state;
        return(
            <div>
            {
                data != '' ?
                    <div className="book_detail_general_div">
                        <div className="img_div">
                            <img src={PATH['_ROOT_'] + (showing_detail_img == '' ?  data.detail_img[0]: showing_detail_img)} style={{width:'100%'}} />
                            <div className="detail_preview_img_div" style={{textAlign:'center'}}>
                                {
                                    data.detail_img.map((val, index)=>{
                                        return <img onMouseEnter={this.changeDetailImg.bind(this, val)} key={index} src={PATH['_ROOT_'] + val} style={{width:'40px', marginRight:'2px'}}/>
                                    })
                                }
                            </div>
                        </div>
                        <div className="info_div">
                            <p>{data['name']}</p>
                            <p>{data['introduction']}</p>
                            <p>作者：<span>{data['author']}</span>出版社：<span>{data['edition']}</span></p>
                            <div className="buy_info">
                                <span><Rate disabled={true} allowHalf defaultValue={data['comment_level']} /></span>
                                <span>{data['count_buy']}人购买</span>
                                <span>{data['count_comment']}条评论</span>
                            </div>
                            <p>￥{data['price'].toFixed(2)}</p>
                            <div style={{marginBottom:'20px'}}><span><InputNumber size="large" onChange={(value)=>this.state.shopping_cart_count=value} min={1} max={data['stock']} defaultValue={1} /></span><span style={{fontSize:'10px',marginLeft:'10px'}}>(库存 <span style={{fontSize:'14px'}}>{data['stock']}</span> 件)</span></div>
                            <div className="btn_group">
                                <ButtonGroup style={{float:'left'}}>
                                    <Button onClick={this.btnShoppingcart.bind(this)} style={{fontSize:'16px'.button_group_font_size}}>
                                        <Icon type="shopping-cart" />购物车
                                    </Button>
                                    <Button onClick={this.btnCollectHandle.bind(this, data['id'], data['price'])} style={{fontSize:'16px'.button_group_font_size}}>
                                        <Icon type={is_collected == 1 ? "heart" : "heart-o"} />收藏
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                    : <div></div>
            }
            </div>
        )
    }
}
export { BookDetailGeneral };