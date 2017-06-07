/**
 * Created by ouchao on 2017/5/19.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { Icon, Pagination, Tag, Spin } from 'antd';
import { PolygonTitle } from  '../../../js/cpt_polygon-title';
import '../css/cpt_book-comment.css';
class BookCommentTab extends React.Component {
    static defaultProps = {
        book_id: 0,
    }
    constructor(props){
        super(props);
        this.state = {
            data: [],
            tags: [],
            select_tags: [],
            page_now: 1,
            page_length: 10,
            total_count: 0,
            table_is_loading: true,
            good_comment_rate: '0%',
        }
    }
    componentWillMount(){
        this.getComment();
        this.getTags();
    }
    getComment(){
        this.setState({table_is_loading: true});
        const { page_now, page_length, select_tags} = this.state;
        $.post(
            PATH['_URL_'] + 'book/bookDetail/getComment',
            {
                book_id: this.props.book_id,
                page_now: page_now,
                page_length: page_length,
                tags: select_tags.join(','),
            },
            (res)=>{
                this.setState({data: res.data, total_count: res.total_count, table_is_loading: false, good_comment_rate: res.good_comment_rate});
            }
        )
    }
    getTags(){
        $.post(
            PATH['_URL_'] + 'book/bookDetail/getTags',
            (res)=>{
                this.setState({tags: res});
            }
        )
    }
    selectCommentTags(tag_id){
        let temp = this.state.select_tags;
        let p = temp.indexOf(tag_id)
        p == -1 ? temp.push(tag_id) : temp.splice(p, 1);
        this.state.select_tags = temp;
        this.state.page_now= 1;
        this.getComment();
    }
    render(){
        const { tags, select_tags, page_now, page_length, total_count, data, table_is_loading, good_comment_rate} = this.state;
        return(
            <div>
                <div>
                    <div>
                        <div className="good_comment_rate_div">
                            <p>{good_comment_rate}</p>
                            <Icon type="like" />
                        </div>
                        <div style={{display:'inline-block',width:'60%',textAlign:'center'}}>
                            {
                                tags.map((val, index)=>{
                                    return <Tag key={index} style={select_tags.indexOf(val.id) == -1?{}:{borderColor:'red'}} onClick={this.selectCommentTags.bind(this, val.id)}>{val.value}</Tag>
                                })
                            }
                        </div>
                    </div>
                    <PolygonTitle title="精选评论" />
                    <div style={{width:'90%',margin:'auto'}}>
                        {
                            table_is_loading ? <div style={{width: '100%',height:'200px',paddingTop:'40px',marginLeft:'46%'}}><Spin size="large" /></div> :
                            data.map((val, index)=>{
                                return(
                                    <div key={index} className="comment_div">
                                        <div style={{marginBottom:'10px'}}>
                                            {
                                                val['img'].map((_val,_index)=>{
                                                    return <img key={_index} style={{width:'60px', maxHeight:'60px', marginRight:'10px'}} src={PATH['_DATA_'] +"upload/comment/"+ _val} />
                                                })
                                            }
                                        </div>
                                        <p style={{marginBottom:'10px'}}>{val['content']}</p>
                                        <p style={{fontWeight:'100'}}>{val['add_time']}</p>
                                    </div>
                                )
                            })
                        }
                        <Pagination style={{float:'right', paddingTop:'10px'}} showQuickJumper={true} current={page_now} pageSize={page_length} total={total_count}/>
                    </div>
                </div>
            </div>
        )
    }
}
export { BookCommentTab };