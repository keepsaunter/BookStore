/**
 * Created by ouchao on 2017/4/17.
 */
import {React, ReactDom, PATH} from  '../../../js/my-import';
import { RegisterFormFrame } from './cpt_register-form-frame';
class RegisterFrame  extends React.Component {
    render(){
        return (
            <div>
                <div style={{width:'56%',margin:'auto'}}>
                    <div style={{marginBottom:'14px'}}>
                        <img onClick={()=>location.href = PATH['_URL_'] + 'homepage/homepage'} src={PATH['_ROOT_'] + "/public/images/store_logo.png"} style={{width:'18%', cursor: 'pointer'}} />
                    </div>
                    <RegisterFormFrame />
                </div>
            </div>
        )
    }
}
ReactDom.render(<RegisterFrame/>, contain);