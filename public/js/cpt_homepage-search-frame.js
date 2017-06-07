/**
 * Created by ouchao on 2017/5/12.
 */
import { React, $, PATH } from './my-import';
import { BookSearchFrame } from './cpt_book-search-frame';
import { Icon, Button } from 'antd';
const ButtonGroup = Button.Group;
class HomepageSearch extends React.Component {
    static defaultProps = {
        scroll_status: false,
    }
    render(){
        const { scroll_status } = this.props;
        var all_style = {};
        const img_path = "/public/images/";
        if(scroll_status){
            all_style = {
                div_padding_top: '6px',
                img_width: '54%',
                img_src: img_path + "store_logo_small.png",
                book_search_frame_height: "30px",
                button_group_font_size: "14px",
            }
        }else{
            all_style = {
                div_padding_top: '20px',
                img_width: '100%',
                img_src: img_path + "store_logo.png",
                book_search_frame_height: "38px",
                button_group_font_size: "18px",
            }
        }
        return(
            <div style={{paddingTop: all_style.div_padding_top}}>
                <div style={{width:'14%', display:'inline-block'}}>
                    <img onClick={()=>location.href = PATH['_URL_'] + 'homepage/homepage'} src={PATH['_ROOT_'] + all_style.img_src} style={{width:all_style.img_width, cursor: 'pointer'}} />
                </div>
                <div style={{width:'46%', display:'inline-block',marginLeft:'5%'}}>
                    <BookSearchFrame height={all_style.book_search_frame_height} />
                </div>
                <div style={{width:'20%', display:'inline-block',marginLeft:'13%'}}>
                    <ButtonGroup style={{float:'left'}}>
                        <Button onClick={()=>location.href = PATH['_URL_'] + 'shoppingCart'} style={{fontSize:all_style.button_group_font_size, height: all_style.book_search_frame_height}}>
                            <Icon type="shopping-cart" />购物车
                        </Button>
                        <Button onClick={()=>location.href = PATH['_URL_'] + 'personal/myOrder'} style={{fontSize:all_style.button_group_font_size, height: all_style.book_search_frame_height}}>
                            <Icon type="inbox" />
                            订单
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}
export { HomepageSearch };