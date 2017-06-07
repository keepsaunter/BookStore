/**
 * Created by ouchao on 2017/4/22.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { BookShelf } from  './cpt_bookshelf-frame';
import { HomePageHeader } from '../../../js/cpt_homepage-header';
import { HomepageCarousel } from './cpt_carousel-frame';
import { ClassfyFrame } from './cpt_classfy-frame';
import { NewBooks } from './cpt_new-books';
import '../css/index.css';
class Homepage extends React.Component{
    render(){
        return (
            <div>
                <HomePageHeader />
                <div className="classfy_carousel_div" >
                    <ClassfyFrame />
                    <HomepageCarousel />
                    <div style={{float: 'right',width:'76%',height:'492px'}}><NewBooks/></div>
                </div>
                <BookShelf />
            </div>
        )
    }
}
ReactDom.render(<Homepage />, contain);