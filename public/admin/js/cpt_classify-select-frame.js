/**
 * Created by ouchao on 2017/5/7.
 */
import { React, $ } from  '../../js/my-import';
import { Form, Row, Col, Select  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class ClassifySelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [[],[],[]],
            select_option:[],
        }
        this.getOptions(0, -1);
    }
    getOptions(id, index){
        $.post(
            'Addbook/getClassify',
            {
                'id': id,
            },
            (res) => {
                this.state.select_option = this.state.select_option.slice(0, index + 1);
                for (var i = index + 1, j = 0; i < 3; i++, j++){
                    if(j < res.length){
                        var temp = res[j];
                        this.state.data[i] = temp;
                        if(temp.length > 0){
                            this.state.select_option[i] = temp[0].id;
                        }
                    }else{
                        this.state.data[i] = [];
                    }
                }
                this.forceUpdate();
            }
        )
    }
    classifyHandleSelect(index, value){
        if(value.key != this.state.select_option[index]){
            $('.ant-select-selection-selected-value').eq(index).text(value.label);
            this.state.select_option[index] = value.key;
            if(index != 2){
                this.getOptions(value.key, index);
            }
        }
    }
    render(){
        const selectProps = {
            showSearch: true,
            style:{ width: 200 },
            placeholder:"Select a classify",
            optionFilterProp:"children",
            labelInValue:true,
            allowClear:true,
        }
        return(
            <Row>
                <Col xs={12} md={9}>
                    <FormItem
                        labelCol= {{
                            xs: { span: 24 },
                            sm: { span: 8 },
                        }}
                        wrapperCol= {{
                            xs: { span: 24 },
                            sm: { span: 16 },
                        }}
                        label={"分类"}
                    >
                        {
                            (()=>{
                                var data = this.state.data[0];
                                if (data.length == 0){
                                    return <div></div>
                                }else{
                                   return <Select
                                        {...selectProps}
                                        value={{key:this.state.select_option[0].toString()}}
                                        onSelect = {this.classifyHandleSelect.bind(this, 0)}
                                    >
                                        {
                                            data.map((val, index)=>{
                                                return(
                                                    <Option key={index} value={val.id.toString()}>{val.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                               }
                            })()
                        }
                    </FormItem>
                </Col>
                <Col xs={12} md={7}>
                    <FormItem
                        wrapperCol= {{
                            xs: { span: 24 },
                        }}
                    >
                        {
                            (()=>{
                                var data = this.state.data[1];
                                if(data.length == 0) {
                                    return <div></div>
                                }else{
                                    return <Select
                                        {...selectProps}
                                        value={{key:this.state.select_option[1].toString()}}
                                        onSelect = {this.classifyHandleSelect.bind(this, 1)}
                                    >
                                        {
                                            data.map((val, index)=>{
                                                return(
                                                    <Option key={index} value={val.id.toString()}>{val.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                }
                            })()
                        }
                    </FormItem>
                </Col>
                <Col xs={12} md={7}>
                    <FormItem
                        wrapperCol= {{
                            xs: { span: 24 },
                        }}
                    >
                        {
                            (()=>{
                                var data = this.state.data[2];
                                if(data.length == 0){
                                    return <div></div>
                                }else{
                                    return <Select
                                        {...selectProps}
                                        value={{key:this.state.select_option[2].toString()}}
                                        onSelect = {this.classifyHandleSelect.bind(this, 2)}
                                    >
                                        {
                                            data.map((val, index)=>{
                                                return(
                                                    <Option key={index} value={val.id.toString()}>{val.name}</Option>
                                                )
                                            })
                                        }
                                    </Select>
                                }
                            })()
                        }
                    </FormItem>
                </Col>
            </Row>
        )
    }
}
export { ClassifySelect };