/**
 * Created by ouchao on 2017/5/13.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { ShoppingcartBookTable } from './cpt_shoppingcart-book-table';

class ShappingCart extends React.Component{
    render(){
        return (
            <div style={{minWidth:'1420px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                    <ShoppingcartBookTable />
                </div>
            </div>
        );
    }
}
ReactDom.render(<ShappingCart />, contain);