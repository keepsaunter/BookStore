/**
 * Created by ouchao on 2017/4/22.
 */
import {React} from  './my-import';
import {SearchBar} from  './cpt_searchBar-frame';
import '../css/cpt_homepage-header.css';
class HomePageHeader extends React.Component{
    render(){
        return (
            <div className="homePageHeader"><SearchBar /></div>
        );
    }
}
export {HomePageHeader};