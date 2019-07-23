import React, {Component} from 'react';
import LoginButton from './button';
import FacebookLogin from 'react-facebook-login';
import '../App.css';

const VK = window.VK;
class LoginForm extends Component {

constructor(){
    super()
    this.state = {
        authentication: false
    }

}


vkLogin = () => {
    VK.Auth.login(response => {
        console.log(response)

        if(response.status === "connected"){
            this.props.getAuthenticationDataVK(response)
        } else {
            console.log('No Login')
        };
    
    })
}
responseFacebook = response => {
    const respLength = Object.getOwnPropertyNames(response);

    if(respLength.length === 1){
       console.log('No Login') 
    } else {
       this.props.getAuthenticationDataFB(response);
    };
}


render(){
    return(
        <div className='loginForm'>

            <h1 className='loginFormHeader'>Sign in to Сhat</h1>
            <div className='loginButtons'>
                
                 <FacebookLogin
                    appId="2307508532825711"
                    autoLoad={false}
                    onClick={this.componentClicked}
                    callback={this.responseFacebook} 
                    cssClass="facebookButton"
                />

                <LoginButton 
                    buttonText = {'Login with VK'}
                    onClick = {this.vkLogin}
                    className = {'VKButton'}
                />
            </div>
        </div>
    )
}
}

export default LoginForm;