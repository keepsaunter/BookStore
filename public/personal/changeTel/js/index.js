/**
 * Created by ouchao on 2017/5/11.
 */
import { React, ReactDom, $ } from  '../../../js/my-import';
import { HeaderFrame } from '../../../js/cpt_header-frame';
import { PersonalMenu } from '../../js/cpt_personal-menu';
import { ChangeTelFormForm } from './cpt_change-tel-form';

class PersonalInfo extends React.Component{
    render(){
        return (
            <div style={{minWidth:'1420px'}}>
                <HeaderFrame />
                <div style={{height:'100%', width:'70%',margin:'auto'}}>
                    <div style={{width: '20%', float:'left'}}>
                        <PersonalMenu selected_key='personal/changeTel' />
                    </div>
                    <div style={{width: '74%', marginLeft:'26%', paddingTop:'30px'}}>
                        <ChangeTelFormForm />
                    </div>
                </div>
            </div>
        );
    }
}
ReactDom.render(<PersonalInfo />, contain);