import React, {Component} from 'react';
import '../App.css';

class Button extends Component {

    render(){
        return(
            <button className = {this.props.className}
                    onClick = {this.props.onClick}
            >
                {this.props.buttonText}
            </button>
        )
    }
}

export default Button;
