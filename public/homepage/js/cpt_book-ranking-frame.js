/**
 * Created by ouchao on 2017/5/12.
 */
import { React, $, PATH } from  '../../js/my-import';
import '../css/cpt_book-ranking-frame.css';
class BookRanking extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page_now: 1,
            page_length: 10,
            data: [],
        }
    }
    getBookRank(){
        $.get(
            'homepage/getBookRank',
            {
                page_now: this.state.page_now,
                page_length: this.state.page_length,
            },
            (res)=>{
                this.setState({data: res.data});
            }
        )
    }
    componentWillMount(){
        this.getBookRank();
    }
    bookRankShowImgHandle(e){
        e.stopPropagation();
        let _target = $(e.target).hasClass('book_li_div') ?  $(e.target) : $(e.target).parents('.book_li_div');
        $(_target).find('.book_name_span').hide();
        $(_target).find('.book_info_div').show();
    }
    bookRankHideImgHandle(e){
        e.stopPropagation();
        let _target = $(e.target).hasClass('book_li_div') ?  $(e.target) : $(e.target).parents('.book_li_div');
        $(_target).find('.book_info_div').hide();
        $(_target).find('.book_name_span').show();
    }
    render(){
        const { data } = this.state;
        return(
            <div className="book_rank_div" style={{border:'solid 2px #eeeeee',borderTopRightRadius:'6px',borderTopLeftRadius:'6px'}}>
                <div style={{backgroundColor:'#eeeeee',height:'36px', textAlign:'center', fontSize:'20px'}}>图书畅销榜</div>
                {
                    data.map((val, index)=>{
                        return(
                            <div onClick={()=>location.href = PATH['_URL_'] + 'book/bookDetail?book_id='+val.id} key={index} className="book_li_div" onMouseEnter={this.bookRankShowImgHandle} onMouseLeave={this.bookRankHideImgHandle}>
                                <div style={index < 3 ? {color: 'red'}:{}}>{index+1}</div>
                                <span style={{overflow:'hidden',
                                    textOverflow:'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient:'vertical'}} className="book_name_span">{val.name}</span>
                                <span className="book_info_div">
                                    <img style={{width:'56px', marginTop:'10px'}} src={PATH['_ROOT_'] + val['img_id']}/>
                                    <div style={{lineHeight:'20px',fontSize:'13px',display:'inline-block',width:'110px',float:'right',marginTop:'20px'}}>
                                        <span style={{overflow:'hidden',
                                            textOverflow:'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient:'vertical'}}>{val.name}</span>
                                        <span style={{color:'#A8673C',overflow:'hidden',
                                            textOverflow:'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient:'vertical'}}>{val.author}</span>
                                    </div>
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export { BookRanking };