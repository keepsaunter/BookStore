/**
 * Created by ouchao on 2017/5/11.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { AdminLiginForm } from './cpt_admin-login-form';

class ChangePassword extends React.Component{
    render(){
        return (
            <div>
                <AdminLiginForm />
            </div>
        );
    }
}
ReactDom.render(<ChangePassword />, contain);