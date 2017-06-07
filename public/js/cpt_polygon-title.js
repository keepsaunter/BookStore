/**
 * Created by ouchao on 2017/5/13.
 */
import { React } from  './my-import';
class PolygonTitle extends React.Component {
    static defaultProps = {
        title: ''
    }
    render(){
        return(
            <div style={{width:'100%',height:'30px',borderLeft:'solid 2px red',borderBottom:'solid 2px #eeeeee', marginBottom:'16px'}}>
                <div style={{display:'inline-block', width:'140px', fontSize:'16px', float:'left', padding:'3px 14px', height:'30px',backgroundColor:'#eeeeee'}}>{this.props.title}</div>
                <div style={{display:'inline-block', width:'0px',height:'0px',border:'solid 15px transparent', borderLeft:'solid 15px #eeeeee', borderBottom:'solid 15px #eeeeee'}}></div>
            </div>
        )
    }
}
export { PolygonTitle };