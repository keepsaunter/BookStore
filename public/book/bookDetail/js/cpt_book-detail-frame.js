/**
 * Created by ouchao on 2017/5/13.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { BookDetailGeneral } from './cpt_book-detail-general';
import { BookDetailTab } from './cpt_book-detail-tab';
import { BookCommentTab } from './cpt_book-comment';
import { Icon,Tabs } from 'antd';
const TabPane = Tabs.TabPane;
class BookDetail extends React.Component {
    static defaultProps = {
        book_id: 1,
    }
    constructor(props){
        super(props);
        this.state = {
            data: '',
        }
    }
    componentWillMount(){
        this.getBookInfo();
    }
    getBookInfo(){
        $.get(
            PATH['_URL_'] + 'book/bookDetail/getBookDetail',
            {
                'id': this.props.book_id,
            },
            (res)=>{
                this.setState({data: res});
        }
        )
    }
    render(){
        const { data } = this.state;
        return(
            <div>
                <div><BookDetailGeneral data={data} /></div>
                <div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><Icon type="book" />图书详情</span>} key="1">
                            <div>
                                <BookDetailTab data={data} />
                            </div>
                        </TabPane>
                        <TabPane tab={<span><Icon type="message" />图书评论({data['count_comment']})</span>} key="2">
                            <div>
                                <BookCommentTab book_id={ this.props.book_id } />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export { BookDetail };