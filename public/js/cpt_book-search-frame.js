/**
 * Created by ouchao on 2017/5/12.
 */
import { React, PATH } from './my-import';
import { Input, Select, Icon } from 'antd';
const Option = Select.Option;
class BookSearchFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search_type: '0',
            search_val: '',
        }
    }
    searchBookHandle(){
        const { search_type, search_val } = this.state;
        location.href = encodeURI(PATH['_URL_'] + 'book/searchBook?type='+search_type+'&search_val='+search_val);
    }
    render(){
        const { search_type, search_val } = this.state;
        const selectBefore = (
            <Select onChange={(val)=>this.setState({search_type: val})} value={search_type} style={{ width: 80 }}>
                <Option value="0">搜书名</Option>
                <Option value="1">搜作者</Option>
            </Select>
        );
        return(
            <div>
                <Input onChange={(e)=>this.setState({search_val: e.target.value})} value={search_val} style={{height:this.props.height}} addonBefore={selectBefore} addonAfter={(<Icon onClick={this.searchBookHandle.bind(this)} style={{fontSize: (0.5 * parseInt(this.props.height))+'px',  cursor: 'pointer'}} type="search" />)} />
            </div>
        );
    }
}
export { BookSearchFrame };