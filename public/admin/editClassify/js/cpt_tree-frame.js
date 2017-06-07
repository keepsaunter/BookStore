/**
 * Created by ouchao on 2017/5/6.
 */
import { React, $ } from  '../../../js/my-import';
import { Card, Icon, Select, Modal, Input, message } from 'antd';
import '../css/cpt_tree-frame.css';

const Option = Select.Option;
class TrreeFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            parend_node: [0, '根节点'],
            parent_nodes: [{"id":0,name:'根节点'}],
            data : [],
            modal_data: '',
            addModal_visible: false,
            confirmLoading: false,
            deleteModal_visible: false,
        }
        this.getSelectParentNode();
        this.getNodesData(0);
    }
    appendData(parent_id, new_data){
        var n = 0, flag=false;
        for(var val of this.state.data){
            if (val.id == parent_id){
                this.state.data[n].child = val.child.concat([new_data]);
                flag=true;
                break;
            }
            n++;
        }
        if(!flag){
            this.state.data = this.state.data.concat([new_data]);
        }
        this.forceUpdate();
    }
    handleChange(value) {
        this.state.parend_node = [value.key, value.label];
        this.getNodesData(value.key);
    }
    getSelectParentNode(){
        $.get(
            'editclassify/getRoot',
            (res)=>{
                this.setState({parent_nodes: this.state.parent_nodes.concat(res)});
            }
        )
    }
    getNodesData(parent_id){
        $.post(
            'editclassify/getChild',
            {
                'id' : parent_id,
            },
            (res)=>{
                this.setState({data: res});
            }
        )
    }
    addNode(parent_node_id, parent_node_name){
        this.state.modal_data = [parent_node_id, parent_node_name];
        this.setState({addModal_visible: true});
    }
    deleteNode(id, nmae){
        this.state.modal_data = [id, nmae];
        this.setState({deleteModal_visible: true});
    }
    addModalHandleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        var parent_id = this.state.modal_data[0];
        var name = this.refs.add_classify_name_input.refs.input.value;
        $.post(
            'editclassify/addChild',
            {
                'parent_id': parent_id,
                'name': name,
            },
            (res)=>{
                if(res.status == 100){
                    this.appendData(parent_id, {'id': res.data, 'name': name, child:[]});
                    if(parent_id == 0){
                        this.state.parent_nodes = this.state.parent_nodes.concat([{'id': res.data, 'name': name}]);
                    }
                    message.success(res.info);
                }else{
                    message.error(res.info);
                }
                this.refs.add_classify_name_input.refs.input.value = '';
                this.setState({
                    addModal_visible: false,
                    confirmLoading: false,
                });
            }
        )
    }
    addModalHandleCancel = () => {
        this.setState({
            addModal_visible: false,
        });
    }
    deleteModalHandleOk= () => {
        this.setState({
            confirmLoading: true,
        });
        $.post(
            'editclassify/deleteChild',
            {
                'id': this.state.modal_data[0],
            },
            (res)=>{
                if(res.status == 100){
                    this.getNodesData(this.state.parend_node[0]);
                    if(this.state.parend_node[0] == 0){
                        var n = 0;
                        for (var val of this.state.parent_nodes){
                            if(val.id == this.state.modal_data[0]){
                                this.state.parent_nodes.splice(n, 1);
                                break;
                            }
                            n++;
                        }
                    }
                    message.success(res.info);
                }else{
                    message.error(res.info);
                }
                this.setState({
                    deleteModal_visible: false,
                    confirmLoading: false,
                });
            }
        )
    }
    deleteModalHandleCancel = () => {
        this.setState({
            deleteModal_visible: false,
        });
    }
    render(){
        const card_style = {
            width: 160,
            overflow: 'visible'
        };
        const card_body_style = {
            padding:'8px'
        };
        const card_icon_style = {
            float:'right',
            marginTop: '4px'
        };
        const add_icon_style = {
            paddingTop:'8px',
            fontSize:'20px',
            paddingRight:'3px',
            float:'right',
        };
        return(
            <div className="tree_div">
                <div style={{display:'block',marginBottom:'40px', fontSize:'14px'}}>
                    选择节点展开：
                    <Select
                        showSearch
                        style={{ width: 240 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        defaultValue={{key:'0'}}
                        labelInValue
                        onChange={this.handleChange.bind(this)}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {
                            this.state.parent_nodes.map((val, index)=>{
                                return <Option key={index} value={val.id.toString()}>{val.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="first_child_div">
                    {
                        this.state.data.map((value, index)=>{
                            return (
                                <Card key={index} className="tree_node_card" style={card_style} bodyStyle={card_body_style}>
                                    <p>{value.name}<Icon onClick={this.deleteNode.bind(this, value.id, value.name)} type="close-circle-o" style={card_icon_style} /></p>
                                </Card>
                            )
                        })
                    }
                    <Card className="tree_node_card" style={card_style} bodyStyle={card_body_style}>
                        <Icon type="plus-circle" onClick={this.addNode.bind(this, this.state.parend_node[0], this.state.parend_node[1])} style={{fontSize:'16px',marginLeft:'40%'}}/>
                    </Card>
                </div>
                <div className="second_child_div">
                    {
                        this.state.data.map((value, index)=>{
                            return (
                                <div key={index}>
                                    {
                                        value.child.map((t_val, t_index)=>{
                                            return(
                                                <Card key={t_index} className="tree_node_card" style={card_style} bodyStyle={card_body_style}>
                                                    <p>{t_val.name}<Icon onClick={this.deleteNode.bind(this, t_val.id, t_val.name)} type="close-circle-o" style={card_icon_style} /></p>
                                                </Card>
                                            )
                                        })
                                    }
                                    <Icon type="plus-circle" onClick={this.addNode.bind(this, value.id, value.name)} style={value.child.length >= 10 ? Object.assign({}, add_icon_style, {display:'none'}) : add_icon_style} />
                                </div>
                            );
                        })
                    }
                </div>
                <Modal title="新增分类"
                       visible={this.state.addModal_visible}
                       onOk={this.addModalHandleOk}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.addModalHandleCancel}
                >
                    <p style={{textAlign:'center',width:'80%'}}>
                        <span style={{width:'30%',display: 'inline-block',marginLeft: '15%'}}>上层分类名: </span><Input style={{width:'55%'}} value={this.state.modal_data[1]} disabled={true}/>
                        <span style={{width:'30%',display: 'inline-block',marginLeft: '15%', marginTop:'10px'}}>新增分类名:</span><Input ref="add_classify_name_input" style={{width:'55%'}} placeholder="classify name"/>
                    </p>
                </Modal>
                <Modal title="删除分类"
                       visible={this.state.deleteModal_visible}
                       onOk={this.deleteModalHandleOk}
                       confirmLoading={this.state.confirmLoading}
                       onCancel={this.deleteModalHandleCancel}
                >
                    <p style={{textAlign:'center',width:'80%'}}>
                        <Icon type="exclamation-circle" />  确定删除分类 <span style={{color:'red'}}>{this.state.modal_data[1]}</span> 及其子分类！
                    </p>
                </Modal>
            </div>
        );
    }
}
export { TrreeFrame };