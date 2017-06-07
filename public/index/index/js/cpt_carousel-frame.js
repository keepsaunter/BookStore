/**
 * Created by ouchao on 2017/4/23.
 */
import { React } from  '../../../js/my-import';
import { Carousel } from 'antd';
import '../css/cpt_carousel-frame.css';

class HomepageCarousel extends React.Component{
    render() {
        const settings = {
            customPaging(i){
                return <div className="carouser-ul-div">试试试试试试试试试试</div>
            }
        };
        return (
            <Carousel vertical="true"  {...settings}>
                {/*<div><img src="public/index/images/wise.jpg" style={{display:'block'}}/></div>*/}
                <div style={{backgroundImage:'url("public/index/images/book_test.png")'}}><h3>1</h3></div>
                <div><h3>2</h3></div>
                <div><h3>3</h3></div>
                <div><h3>4</h3></div>
                <div><h3>5</h3></div>
            </Carousel>
        );
    }
}
export { HomepageCarousel };
