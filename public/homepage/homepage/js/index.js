/**
 * Created by ouchao on 2017/5/10.
 */
import { React, ReactDom } from  '../../../js/my-import';
import { ClassifyMenu } from '../../js/cpt_classify-menu';
import { HeaderFrame } from  '../../../js/cpt_header-frame';
import { CarouselImage } from '../../js/cpt_carousel-image';
import { BookTableNobtn } from '../../js/cpt_book-table-nobtn';
import { BookRanking } from '../../js/cpt_book-ranking-frame';
import { Calendar } from 'antd';
import '../css/index.css';

class Homepage extends React.Component{
    render(){
        return (
            <div style={{height:'100%', minWidth:'1500px'}}>
                <div>
                    <HeaderFrame />
                </div>
                <div style={{width:'75%', margin: 'auto'}}>
                    <div style={{width:'17%', display:'inline-block',float:'left',marginRight:'1%',height:'600px'}}>
                        <ClassifyMenu />
                    </div>
                    <div>
                        <div style={{display:'inline-block',height:'310px',width:'700px'}}><CarouselImage /></div>
                        <div style={{float:'right',width:'19%'}}>
                            <div style={{marginBottom:'6px'}}>
                                <BookRanking />
                            </div>
                            <div style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                                <Calendar fullscreen={false} />
                            </div>
                        </div>

                    </div>
                    <div style={{width:'700px',marginLeft:'18%'}}>
                        <BookTableNobtn />
                    </div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<Homepage />, contain);