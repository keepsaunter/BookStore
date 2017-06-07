/**
 * Created by ouchao on 2017/5/12.
 */
import { React, $, PATH } from  '../../js/my-import';
import { PolygonTitle } from  '../../js/cpt_polygon-title';
import { Card } from 'antd';
import '../css/cpt_book-table-nobtn.css';

class BookTableNobtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page_length: 8,
            page_now: 1,
            data: [],
        }
    }
    componentWillMount(){
        this.getBooks();
    }
    getBooks() {
        $.get(
            'homepage/getNewBooks',
            {
                'page_now': this.state.page_now,
                'page_length': this.state.page_length,
            },
            (res) => {
                this.setState({data: res.data});
            }
        )
    }
    bookDetailHandle(book_id){
        location.href = PATH['_URL_'] + 'book/bookDetail?book_id='+book_id;
    }
    render(){
        const { data } = this.state;
        return(
        <div style={{paddingTop:'10px'}}>
            <PolygonTitle title='新书上架' />
            <div>
                {
                    data.map((val, index)=>{
                        return (
                            <Card onClick={this.bookDetailHandle.bind(this, val['id'])} key={index} className="book_card" style={{display:'inline-block'}} bodyStyle={{ padding: 0 }}>
                                <div className="book_img_div">
                                    <img alt="example" width="100%" src={PATH['_ROOT_'] +val['img_id']} />
                                </div>
                                <div className="book_info_div">
                                    <div style={{width:'100%'}}><span style={{float:'left',fontSize:'18px',color:'red'}}>￥{val['price'].toFixed(2)}</span></div>
                                    <div>
                                        <h3 style={{clear:'both',
                                            overflow:'hidden',
                                            textOverflow:'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient:'vertical'}} title={val['name']}>{val['name']}</h3>
                                        <p>{val['author']}</p>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
        )
    }
}
export { BookTableNobtn };