/**
 * Created by ouchao on 2017/5/10.
 */
import { React } from  './my-import';
import { Icon, Input } from 'antd';
class EditableCell extends React.Component {
    static defaultProps = {
        type: 'text',
        handleCheck: null,
    }
    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
            pre_value: this.props.value,
            editable: false,
        }
    }
    handleCancel = () => {
        this.setState({editable: false, value:this.state.pre_value});
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    handleCheck(){
        if(this.state.value != this.state.pre_value){
            this.props.handleCheck(this.state.value, this);
        }else{
            this.setState({ editable: false });
        }
    }
    render() {
        const { value, editable } = this.state;
        return (
            <div className="editable-cell">
                {
                    editable ?
                        <div className="editable-cell-input-wrapper">
                            <Input
                                value={value}
                                type={this.props.type}
                                style={{width:'80%'}}
                                onChange={this.handleChange}
                            />
                            <div style={{width:'16%',float:'right',marginTop:'-4px',marginLeft:'1px'}}>
                                <Icon
                                    type="close"
                                    className="editable-cell-icon-check"
                                    onClick={this.handleCancel.bind(this)}
                                />
                                <Icon
                                    type="check"
                                    className="editable-cell-icon-check"
                                    onClick={this.handleCheck.bind(this)}
                                />
                            </div>
                        </div>
                        :
                        <div className="editable-cell-text-wrapper">
                            {value || ' '}
                            <Icon
                                style={{float:'right'}}
                                type="edit"
                                className="editable-cell-icon"
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}
export { EditableCell };