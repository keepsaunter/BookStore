/**
 * Created by ouchao on 2017/4/25.
 */
import {React} from  './my-import';

class BookFrame extends React.Component {
    static defaultProps = {
        data:{
            id: React.PropTypes.number,
            img: React.PropTypes.string,
            author: React.PropTypes.string,
            name: React.PropTypes.string,
            price: React.PropTypes.string,
        }
    }
    constructor(props){
        super(props);
    }
    render(){
        var style = {
            backgroundImage: this.props.data.img,
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            height: '70%',
        };
        if(this.props.haveInfo == 'false'){
            style.height = '90%';
        }
        return (
            <div style={{height: '100%', width: this.props.width, display: 'inline-block'}}>
                <div style={style}></div>
                {/*<div><span>{this.props.name}</span></div>*/}
                {/*<div><span>{this.props.author}</span></div>*/}
                {/*<div><span>{this.props.price}</span></div>*/}
            </div>
        );
    }
}
export {BookFrame};