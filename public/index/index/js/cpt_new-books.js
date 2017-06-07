/**
 * Created by ouchao on 2017/4/25.
 */
import { React, $ } from  '../../../js/my-import';
import TweenOne from 'rc-tween-one';
import { BookFrame } from '../../../js/cpt_book-frame'
import '../css/cpt_new-books.css';
class NewBooks extends React.Component {
    static defaultProps = {
        totalPags: 2,
    }
    constructor(props){
        super(props);
        this.animation = [
            {x: '-100%'}
        ];
        this.state = {
            data: new Array(),
            page: 0,
            reverse: true,
        };
    }
    getNewBooks(page){
        $.get(
            'index.php/index/index/getNewBooks',
            {
                'page': page,
            },
            (result)=>{
                // console.log(result);
                this.state.data.push(result);
                this.setState({page: page});
            }
        )
    }
    componentWillMount(){
        this.getNewBooks(1);
    }
    leftChage(){
        this.setState({reverse: true});
    }
    rightChage(){
        var now_page = this.state.page;
        if(now_page < this.props.totalPags && now_page >= this.state.data.length){
            this.getNewBooks(now_page + 1);
        }
        this.setState({reverse: false});
    }
    render(){
        return (
            <div className="new_books_div">
                <TweenOne animation={this.animation} reverse={this.state.reverse} style={{ height: '100%'}}>
                    {
                        this.state.data.map((val, index)=>{
                            return (
                                <div key={index} className="new_books_div_page">
                                    <div className="new_books_div_page_item" >
                                        {
                                            val.slice(0,5).map((value, t_index)=>{
                                                return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                            })
                                        };
                                    </div>
                                    <div className="new_books_div_page_item" style={{marginTop: '4%'}}>
                                        {
                                            val.slice(5).map((value, t_index)=>{
                                                return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                            })
                                        };
                                    </div>
                                </div>
                            );
                        })
                    }

                </TweenOne>
                <div className="new_boos_arrow_div">
                    <div onClick={this.leftChage.bind(this)}></div>
                    <div onClick={this.rightChage.bind(this)}></div>
                </div>
            </div>
        );
    }
}
export {NewBooks};