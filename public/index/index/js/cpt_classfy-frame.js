/**
 * Created by ouchao on 2017/4/23.
 */
import { React } from  '../../../js/my-import';
import '../css/cpt_classfy-frame.css';

class ClassfyFrame extends React.Component{
    render(){
        return(
            <div className="classfy_frame">
                <div className="classfy_items">
                    <div className="classfy_item">分类1</div>
                    <div className="classfy_item">分类2</div>
                    <div className="classfy_item">分类3</div>
                    <div className="classfy_item">分类4</div>
                    <div className="classfy_item">分类5</div>
                    <div className="classfy_item">分类6</div>
                    <div className="classfy_item">分类7</div>
                    <div className="classfy_item">分类8</div>
                    <div className="classfy_item">分类9</div>
                </div>
            </div>
        );
    }
}
export {ClassfyFrame};