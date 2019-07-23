import React, {Component} from 'react';
import '../App.css';

class MassageList extends Component {

    render(){



        return( 
            <ul className='messageList'>
                    
             {this.props.messages.map((message) => {
                return(
                    <li className = {+message.senderId === +this.props.userId ? 'thisUserMessageContainer':'otherUsersMessagesContainer'}>
                        <div className = {+message.senderId === +this.props.userId ? 'thisUserMessage':'otherUsersMessages'}>
                            <div className='messageText'>{message.messageText}</div>
                            <p>{message.senderName} {message.date}</p>
                        </div>
                    
                    </li>
                )
             })}
            </ul>
        )
    }
}

export default MassageList;