import React, {Component} from 'react';
import SendIMG from '../iconSend.png'
import '../App.css';


class SendButton extends Component {

    render(){
        return(

            <input type='image' onClick = {this.props.onClick} 
                                alt='Send' src={SendIMG} 
                                className={this.props.className}>
               
            </input>

            
        )
    }
}

export default SendButton;
