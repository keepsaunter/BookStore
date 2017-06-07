/**
 * Created by ouchao on 2017/5/8.
 */
import { React, $, PATH } from  '../../../js/my-import';
import { ClassifySelect } from '../../js/cpt_classify-select-frame';
import { EditableCell } from '../../../js/cpt_editable-cell';
import '../css/cpt_book-frame.css';
import { Table, Icon, Pagination, Select, Input, Checkbox, message, Popconfirm, Tooltip } from 'antd';
const Option = Select.Option;

class BookFrame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page_now: 1,
            page_length: 10,
            search_name_value: '',
            search_author_value: '',
            search_classification_id: '',
            order_by: '',
            total_count: 0,
            data: [],
            table_loading: false,
            name_filterDropdown_visible: false,
            author_filterDropdown_visible: false,
            use_classify_filter: false,
        }
        this.getData = this.getData.bind(this);
    }
    componentWillMount(){
        this.getData();
    }
    getData(){
        this.setState({table_loading: true});
        if(this.state.use_classify_filter){
            var temp = this.refs.classify_select.state.select_option;
            this.state.search_classification_id = temp[temp.length - 1];
        }else{
            this.state.search_classification_id = '';
        }
        $.post(
            'scanbook/getBooks',
            {
                page_now: this.state.page_now,
                page_length: this.state.page_length,
                search_name_value: this.state.search_name_value,
                search_author_value: this.state.search_author_value,
                search_classification_id: this.state.search_classification_id,
                order_by: this.state.order_by,
            },
            (res) => {
                this.setState({data: res.data, total_count: res.total_count, table_loading: false});
            }
        )
    }
    pageLengthChangeHandle(k){
        this.state.page_length = parseInt(k);
        this.state.page_now = 1;
        this.getData();
    }
    useClassifyFilter(e){
        this.setState({use_classify_filter: e.target.checked});
    }
    classifySearchClickHandle(){
        this.state.page_now = 1;
        this.getData();
    }
    nameSearchHandle(e){
        this.state.search_name_value = e.target.value;
        this.state.name_filterDropdown_visible = false;
        this.state.page_now = 1;
        this.getData();
    }
    authorSearchHandle(e){
        this.state.search_author_value = e.target.value;
        this.state.author_filterDropdown_visible = false;
        this.state.page_now = 1;
        this.getData();
    }
    tableChangeHandle(page, filter, sorter){
        if(page.current != this.state.page_now){
            this.state.page_now = page.current;
        }else{
            this.state.page_now = 1;
        }
        if(sorter.column != undefined){
            this.state.order_by = sorter.column.dataIndex+" "+(sorter.order == 'ascend' ? 'asc' : 'desc');
        }else{
            this.state.order_by = '';
        }
        this.getData();
    }
    priceEditSave(id, value, _this){
        $.post(
            'scanbook/editBookPrice',
            {
                'id': id,
                'value': value,
            },
            (res) => {
                _this.setState({ editable: false });
                if(res.status == 100){
                    _this.setState({ pre_value: _this.state.value });
                    message.success(res.info);
                }else{
                    _this.setState({ value: _this.state.pre_value });
                    message.error(res.info);
                }
            }
        )
    }
    stockEditSave(id, value, _this){
        $.post(
            'scanbook/editBookStock',
            {
                'id': id,
                'value': value,
            },
            (res) => {
                _this.setState({ editable: false });
                if(res.status == 100){
                    _this.setState({ pre_value: _this.state.value });
                    message.success(res.info);
                }else{
                    _this.setState({ value: _this.state.pre_value });
                    message.error(res.info);
                }
            }
        )
    }
    deleteBookHandle(id){
        $.get(
            'scanbook/deleteBook',
            {
                'id': id,
            },
            (res) => {
                if(res.status == 100){
                    message.success(res.info);
                    this.getData();
                }else{
                    message.error(res.info);
                }
            }
        )
    }
    render(){
        const columns_width_small = '100px';
        const columns_width = '120px';
        const columns_width_large = '146px';
        const columns_width_larger = '230px';
        const { page_now } = this.state;
        const columns = [
            {
            title: '缩略图',
            dataIndex: 'img_id',
            key: 'img_id',
            width:columns_width,
            fixed: 'left',
            render: text => <img style={{width:'100px'}} src={PATH['_ROOT_'] + text} />,
        },
            {
            title: '名称',
            dataIndex: 'name',
            width: columns_width,
            fixed: 'left',
            key: 'name',
            filterDropdown: (
                <div className="custom-filter-dropdown">
                    <Input
                        ref={ele => this.searchInput = ele}
                        placeholder="Search name"
                        onPressEnter={this.nameSearchHandle.bind(this)}
                    />
                </div>
            ),
            filterIcon: <Icon type="smile-o" style={{ color: this.state.search_name_value != '' ? '#108ee9' : '#aaa' }} />,
            filterDropdownVisible: this.state.name_filterDropdown_visible,
            onFilterDropdownVisibleChange: visible => this.setState({ name_filterDropdown_visible: visible }, () => this.searchInput.focus()),
        }, {
            title: '作者',
            dataIndex: 'author',
            width: columns_width,
            key: 'author',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            ref={ele => this.searchInput = ele}
                            placeholder="Search name"
                            onPressEnter={this.authorSearchHandle.bind(this)}
                        />
                    </div>
                ),
                filterIcon: <Icon type="smile-o" style={{ color: this.state.search_author_value != '' ? 'blue' : '#aaa' }} />,
                filterDropdownVisible: this.state.author_filterDropdown_visible,
                onFilterDropdownVisibleChange: visible => this.setState({ author_filterDropdown_visible: visible }, () => this.searchInput.focus()),
        }, {
            title: '出版社',
            dataIndex: 'edition',
            width: columns_width,
            key: 'edition',
        }, {
            title: '分类',
            dataIndex: 'classification_id',
            width: columns_width_large,
            key: 'classification_id',
        }, {
            title: '价格',
            dataIndex: 'price',
            width: columns_width_small,
            key: 'price',
            render: (text, record) => (
                <EditableCell
                    type="number"
                    value={text}
                    handleCheck={this.priceEditSave.bind(this, record.id)}
                />
            ),
        }, {
            title: '库存',
            dataIndex: 'stock',
            width: columns_width,
            key: 'stock',
            render: (text, record) => (
                <EditableCell
                    type="number"
                    value={text}
                    handleCheck={this.stockEditSave.bind(this, record.id)}
                />
            ),
        }, {
            title: '上架时间',
            dataIndex: 'add_datetime',
            width: columns_width_large,
            key: 'add_datetime',
            sorter: true,
        }, {
            title: '印刷日期',
            dataIndex: 'print_date',
            width: columns_width,
            key: 'print_date',
        },{
            title: '页数',
            dataIndex: 'page_count',
            width: columns_width_small,
            key: 'page_count',
        }, {
            title: '字数',
            dataIndex: 'char_count',
            width: columns_width,
            key: 'char_count',
        },{
            title: '目录',
            dataIndex: 'catalogue',
            width: columns_width_larger,
            key: 'catalogue',
            render:(data) => {
                return (
                    <ul style={{maxHeight:'100px',overflow:'auto',listStylePosition:'inside',listStyleType:'circle'}}>
                        {
                            data.map((val, index)=>{
                                return <li key={index}>{val}</li>
                            })
                        }
                    </ul>);
            }
        }, {
            title: '摘要',
            dataIndex: 'synopsis',
            width: columns_width_larger,
            key: 'synopsis',
            render:text => <div style={{maxHeight:'100px',overflow:'auto'}}>{text}</div>
        },{
                title: '操作',
                dataIndex: 'operation',
                width: columns_width,
                fixed: 'right',
                key: 'operation',
                render:(text, record) =>
                    <span style={{textAlign:'center', height:'161px', display:'table-cell', verticalAlign:'middle'}}>
                        <p style={{lineHeight:'30px'}}>
                            <Tooltip title="详情图片">
                                <a href={PATH['_URL_']+'admin/addImage/detailImage?book_id='+record.id}>DetailImage</a>
                            </Tooltip>
                        </p>
                        <p>
                            <Tooltip title="删除">
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteBookHandle(record.id)}>
                                    <a href="#">Delete</a>
                                </Popconfirm>
                            </Tooltip>
                        </p>
                    </span>
        }];
        return (
            <div className="book_table_div">
                <div>
                    <Select defaultValue="10" style={{ width: 120, marginBottom:'10px', float:'left' }} onChange={this.pageLengthChangeHandle.bind(this)}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="15">15</Option>
                    </Select>
                    <span style={{float:'left',paddingTop:'7px',marginLeft:'50px',marginRight:'10px'}}>启用分类筛选 <Checkbox onChange={this.useClassifyFilter.bind(this)} /></span>
                    <span style={{display:this.state.use_classify_filter ? 'inline' : 'none'}}><ClassifySelect ref="classify_select" /><Icon type="search" onClick={this.classifySearchClickHandle.bind(this)} style={{position:'relative',left:'-6%',fontSize:'20px',top:'6px'}} /></span>
                </div>
                <Table bordered
                       style={{clear:'both'}}
                       columns={columns}
                       rowKey = 'id'
                       loading={this.state.table_loading}
                       dataSource={this.state.data}
                       pagination = {{showQuickJumper: true, current:page_now, pageSize:this.state.page_length, total:this.state.total_count }}
                       scroll={{ x: 1920, y: 600 }}
                       onChange={this.tableChangeHandle.bind(this)}
                />
            </div>
        );
    }
}
export { BookFrame };