/**
 * Created by ouchao on 2017/5/12.
 */
import { React, $, PATH } from  '../../js/my-import';
import { Carousel } from 'antd';
import '../css/cpt_carousel-image.css';

class CarouselImage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount(){
        this.getAdvertImage();
    }
    getAdvertImage(){
        $.get(
            PATH['_URL_'] + 'homepage/homepage/getAdvertImage',
            (res)=>{
                this.setState({data: res});
            }
        )
    }
    render(){
        const { data } = this.state;
        return (
            <Carousel autoplay>
                    {
                        data.length > 0 ?
                            data.map((val, index)=>{
                                return (
                                    <div key={index}>
                                        <img style={{width:'100%'}} src={PATH['_ROOT_']+val.img_src} />
                                    </div>
                                )
                            })
                            :
                            <div></div>
                    }
            </Carousel>
        );
    }
}
export { CarouselImage };