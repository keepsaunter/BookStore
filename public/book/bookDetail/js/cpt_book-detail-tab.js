/**
 * Created by ouchao on 2017/5/13.
 */
import { React } from  '../../../js/my-import';
import { PolygonTitle } from  '../../../js/cpt_polygon-title';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import '../css/cpt_book-detail-tab.css';
class BookDetailTab extends React.Component {
    static defaultProps = {
        data: '',
    }
    render(){
        const { data } = this.props;
        return(
            <div className="book_detail_tab">
                {
                    data != '' ?
                        <div>
                            <div className="content">
                                <p>
                                    <span>页数：{data['page_count']}</span>
                                    <span>字数：{data['char_count']}</span>
                                    <span>印刷时间：{data['print_date']}</span>
                                </p>
                                <p>
                                    <span>所属分类：{data['classification_id']}</span>
                                </p>
                            </div>
                            <PolygonTitle title="图书概要" />
                            <div className="content">
                                <p style={{wordBreak:'break-word'}}>{data['synopsis']}</p>
                            </div>
                            <PolygonTitle title="图书目录" />
                            <div className="content">
                                <Tree
                                    showLine
                                >
                                    {
                                        data['catalogue'].map((val, index)=>{
                                            return <TreeNode title={val} key={index}></TreeNode>
                                        })
                                    }
                                </Tree>
                            </div>
                        </div> :
                        <div></div>
                }
            </div>
        )
    }
}
export { BookDetailTab };