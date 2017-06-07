/**
 * Created by ouchao on 2017/4/22.
 */
import {React} from  './my-import';
import '../css/cpt_searchBar-frame.css';
class SearchBar extends React.Component{
    render(){
        return (
            <div id="searchBar">
                <div className="search_value">
                    <input />
                </div>
                <div className="search_icon"></div>
            </div>
        );
    }
}
export {SearchBar};