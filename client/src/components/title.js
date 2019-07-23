import React, {Component}  from 'react';
import LogOutButton from './button';
import '../App.css';

class Title extends Component {
render() {
    return(
        <div className = 'title'>
            <p>Hello, {this.props.userName }!</p>
            <LogOutButton
                        buttonText = {'Log Out'}
                        onClick = {this.props.logout}
                        className = {'LogoutButton'}
            />
        </div>
    )
}
}

export default Title;