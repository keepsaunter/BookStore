/**
 * Created by ouchao on 2017/5/2.
 */
import {React} from  './my-import';
import AvatarEditor from 'react-avatar-editor';


class ImgcropFrame extends React.Component {
    static defaultProps = {
        width: 150,
        height:  150,
        w_width: 150,
        border: 10,
        color: [125, 126, 122, 0.6],
        image: '../../../public/images/test.jpg',
        rotate: 0,
    }
    constructor(props){
        super(props);
        this.state = {
            scale: 1,
            position:{
                x: 0.00,
                y: 0.00,
                width: 0.00,
                height: 0.00,
            },
            redraw: false,
        }
    }
    setEditorRef  =(editor)=> {
        this.editor  = editor
    }
    componentWillReceiveProps(nextProps){
        this.props = nextProps;
        this.state.redraw = true;
        this.createPreview();
    }
    createPreview(){
        var r_w_scan = this.props.w_width/this.props.width;
        var {x:positionX, y:positionY, width, height} = this.editor.getCroppingRect();
        var img = document.createElement('img');
        img.src = this.props.image;
        img.onload=()=>{
            this.setState({scale:1/(r_w_scan * Math.max(this.props.width/img.width, this.props.height/img.height))});
            if(isNaN(positionX) || this.state.redraw){
                this.state.redraw = false;
                this.state.position = {
                    x: (img.width-this.props.width * r_w_scan) / 2 ,
                    y: (img.height-this.props.height * r_w_scan) / 2,
                    width: this.props.width * r_w_scan,
                    height: this.props.height * r_w_scan,
                }
            }else{
                this.state.position = {
                    x: img.width * positionX,
                    y: img.height * positionY,
                    width: img.width * width,
                    height: img.height * height,
                }
            }
            var context = $('#preview_canvas').get(0).getContext('2d');
            context.clearRect(0, 0, 2 * this.props.width, this.props.height);
            context.drawImage(img, this.state.position.x, this.state.position.y, this.state.position.width, this.state.position.height, 0,0,300, 150);
            context = $('#image_canvas').get(0).getContext('2d');
            context.clearRect(0, 0, 300, 150);
            context.drawImage(img, 0, 0, img.width, img.height, 0,0, img.width > 300 ? 300 : img.width, img.height>150?150 :img.height);
            context.strokeStyle = "red";
            var scal_rec_max = Math.max(img.width/ 300, img.height / 150);
            var scal_rec_min = Math.min(img.width/ 300, img.height / 150);
            if(this.state.position.x < img.width && this.state.position.y < img.height){
                context.strokeRect(
                    scal_rec_max > 1 ? this.state.position.x / scal_rec_max : this.state.position.x,
                    scal_rec_max > 1 ? this.state.position.y / scal_rec_min : this.state.position.y,
                    scal_rec_max > 1 ? this.state.position.width / scal_rec_max : this.state.position.width,
                    scal_rec_max > 1 ? this.state.position.height / scal_rec_min : this.state.position.height,
                );
            }
        }
    }
    mousewheel(e){
        e.preventDefault();
        e.stopPropagation();
        this.createPreview();
        if(e.deltaY > 0){
            if(this.state.scale > 0.1){
                this.setState({'scale': this.state.scale - 0.1});
            }
        }else{
            this.setState({'scale': this.state.scale + 0.1});
        }
    }
    componentDidMount(){
        this.createPreview();
        $('#avatarEditor_div').get(0).onmousewheel = this.mousewheel.bind(this);
    }
    render(){
        return (
            <div>
                <div id="avatarEditor_div" style={{display: 'inline-block',}}>
                    <AvatarEditor
                        ref = { this.setEditorRef }
                        {...this.props}
                        scale={this.state.scale}
                        onMouseMove = { this.createPreview.bind(this) }
                    />
                </div>
                <div style={{display: 'inline-block', marginLeft:'10px',}}>
                    <canvas id="image_canvas" />
                    <canvas id="preview_canvas" style={{padding:'1px',border: 'solid 1px #CCCCCC', width:this.props.width, height:this.props.height}} />
                </div>
            </div>
        )
    }
}
export {ImgcropFrame};