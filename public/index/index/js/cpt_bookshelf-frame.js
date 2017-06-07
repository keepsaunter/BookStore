/**
 * Created by ouchao on 2017/4/27.
 */
import {React, $} from  '../../../js/my-import';
import TweenOne from 'rc-tween-one';
import { BookFrame } from '../../../js/cpt_book-frame'
import '../css/cpt_bookshelf-frame.css';

class BookShelf extends React.Component {
    static defaultProps = {
        bookClass: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            classfy: new Array(),
            data: new Array(),
            show: -1,
        }
        for(var i = 0;i<6;i++){
            this.state.classfy.push({id:'', name:''});
        }
        this.getBooksClassfy = this.getBooksClassfy.bind(this);
        this.getBooksClassfy();
        this.animation = [
            {width: '70%', duration: 1000}
        ];
    }
    getBooksClassfy(){
        $.get(
            'index.php/Index/index/getBestSellBookClassfy',
            (result) => {
                // this.setState({classfy: result});
                this.state.classfy = result;
            }
        )
    }
    componentWillMount(){
        this.changeBookshelf(0);
    }
    changeBookshelf(index){
        console.log("in index");
        var tmp = this.state;
        if(index != tmp.show){
            if(this.state.classfy.length > 0){
                if(tmp.data[tmp.classfy[index].id] == undefined){
                    $.get(
                        'index.php/Index/index/getBestSellBooks',
                        {
                            classfy_id: tmp.classfy[index].id,
                        },
                        (result) => {
                            this.state.data[tmp.classfy[index].id] = result;
                            this.setState({show: index});
                        }
                    )
                }else{
                    this.setState({show: index});
                }
            }
        }
    }

    render(){
        var show = this.state.show;
        return (
            <div className="best_selling_div">
                 <div className="bookshelf_name_div" onClick={this.changeBookshelf.bind(this, 0)}><span>{this.state.classfy[0].name}</span></div>
                 <TweenOne animation={this.animation} reverse={(show-- ==0) ? false : true}>
                        <div className="bookshelf_div">
                            <div>
                            {
                                (this.state.data.slice(this.state.classfy[0].id, this.state.classfy[0].id + 1)).map((val, index)=>{
                                    return val.map((value, t_index)=>{
                                        return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                    })
                                })
                            }
                            </div>
                        </div>
                 </TweenOne>
                <div className="bookshelf_name_div" onClick={this.changeBookshelf.bind(this, 1)}><span>{this.state.classfy[1].name}</span></div>
                <TweenOne animation={this.animation} reverse={(show-- ==0) ? false : true}>
                    <div className="bookshelf_div">
                        <div>
                            {
                                (this.state.data.slice(this.state.classfy[1].id, this.state.classfy[1].id + 1)).map((val, index)=>{
                                    return val.map((value, t_index)=>{
                                        return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                    })
                                })
                            }
                        </div>
                    </div>
                </TweenOne>
                <div className="bookshelf_name_div" onClick={this.changeBookshelf.bind(this, 2)}><span>{this.state.classfy[2].name}</span></div>
                <TweenOne animation={this.animation} reverse={(show-- ==0) ? false : true}>
                    <div className="bookshelf_div">
                        <div>
                            {
                                (this.state.data.slice(this.state.classfy[2].id, this.state.classfy[2].id + 1)).map((val, index)=>{
                                    return val.map((value, t_index)=>{
                                        return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                    })
                                })
                            }
                        </div>
                    </div>
                </TweenOne>
                <div className="bookshelf_name_div" onClick={this.changeBookshelf.bind(this, 3)}><span>{this.state.classfy[3].name}</span></div>
                <TweenOne animation={this.animation} reverse={(show-- ==0) ? false : true}>
                    <div className="bookshelf_div">
                        <div>
                            {
                                (this.state.data.slice(this.state.classfy[3].id, this.state.classfy[3].id + 1)).map((val, index)=>{
                                    return val.map((value, t_index)=>{
                                        return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                    })
                                })
                            }
                        </div>
                    </div>
                </TweenOne>
                <div className="bookshelf_name_div" onClick={this.changeBookshelf.bind(this, 4)}><span>{this.state.classfy[4].name}</span></div>
                <TweenOne animation={this.animation} reverse={(show-- ==0) ? false : true}>
                    <div className="bookshelf_div">
                        <div>
                            {
                                (this.state.data.slice(this.state.classfy[4].id, this.state.classfy[4].id + 1)).map((val, index)=>{
                                    return val.map((value, t_index)=>{
                                        return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                    })
                                })
                            }
                        </div>
                    </div>
                </TweenOne>
                <div className="bookshelf_name_div" onClick={this.changeBookshelf.bind(this, 5)}><span>{this.state.classfy[5].name}</span></div>
                <TweenOne animation={this.animation} reverse={(show-- ==0) ? false : true}>
                    <div className="bookshelf_div">
                        <div>
                            {
                                (this.state.data.slice(this.state.classfy[5].id, this.state.classfy[5].id + 1)).map((val, index)=>{
                                    return val.map((value, t_index)=>{
                                        return <BookFrame key={t_index} haveInfo="false" width='20%' data={value} />;
                                    })
                                })
                            }
                        </div>
                    </div>
                </TweenOne>
            </div>
        );
    }
}
export {BookShelf};