/**
 * Created by ouchao on 2017/5/6.
 */
import { React, ReactDom, $, PATH } from  '../../../js/my-import';
import { PolygonTitle } from '../../../js/cpt_polygon-title';
import { AdminMenu } from  '../../js/cpt_menu';
import { Tag, Card, Input,Select, Button, Icon, message } from 'antd';
import '../../css/common.css';
const InputGroup = Input.Group;
const Option = Select.Option;


class AddTags extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: {'good_tags':[], 'neuter_tags':[], 'bad_tags':[]},
            selected_type: 2,
            tag_title: '',
        }
    }
    componentWillMount(){
        this.getTags();
    }
    getTags(){
        $.post(
            PATH['_URL_'] + 'admin/addTags/getTags',
            (res)=>{
                this.setState({data: res});
            }
        )
    }
    deleteTag(tag_id){
        $.post(
            PATH['_URL_'] + 'admin/addTags/deleteTag',
            {
                tag_id: tag_id,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getTags();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    addTagHandle(){
        const { selected_type, tag_title } = this.state;
        $.post(
            PATH['_URL_'] + 'admin/addTags/addTag',
            {
                type: selected_type,
                title: tag_title,
            },
            (res)=>{
                if(res.status == 100){
                    message.success(res.info);
                    this.getTags();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    render(){
        const { data } = this.state;
        return (
            <div style={{height:'100%'}}>
                <div className="menu_div">
                    <AdminMenu selected_key="admin/addTags" />
                </div>
                <div style={{width:'66%',paddingTop:'20px'}}>
                    <PolygonTitle title="好评" />
                    <Card style={{ width: '80%', marginBottom:'10px', marginLeft:'1%' }}>
                        <div style={{marginBottom:'10px'}}>
                            {
                                data.good_tags.map((val, index)=>{
                                    return (<Tag key={index} closable onClose={this.deleteTag.bind(this, val.id)}>{val.value}</Tag>)
                                })
                            }
                        </div>
                    </Card>
                    <PolygonTitle title="中评" />
                    <Card style={{ width: '80%', marginBottom:'10px', marginLeft:'1%' }}>
                        <div style={{marginBottom:'10px'}}>
                            {
                                data.neuter_tags.map((val, index)=>{
                                    return (<Tag key={index} closable onClose={this.deleteTag.bind(this, val.id)}>{val.value}</Tag>)
                                })
                            }
                        </div>
                    </Card>
                    <PolygonTitle title="差评" />
                    <Card style={{ width: '80%', marginBottom:'10px', marginLeft:'1%' }}>
                        <div style={{marginBottom:'10px'}}>
                            {
                                data.bad_tags.map((val, index)=>{
                                    return (<Tag key={index} closable onClose={this.deleteTag.bind(this, val.id)}>{val.value}</Tag>)
                                })
                            }
                        </div>
                    </Card>
                    <div style={{width:'60%'}}>
                        <InputGroup compact>
                            <Select defaultValue="2" style={{width:'20%'}} onChange={(val)=>this.state.selected_type = val}>
                                <Option value="2">好评</Option>
                                <Option value="1">中评</Option>
                                <Option value="0">差评</Option>
                            </Select>
                            <Input onChange={(e)=>this.state.tag_title = e.target.value} style={{ width: '36%' }} placeholder="Tag Title" />
                            <Button onClick={this.addTagHandle.bind(this)} style={{ height:'28px',backgroundColor:'#eeeeee'}}><Icon type="plus" /></Button>
                        </InputGroup>
                    </div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<AddTags />, contain);