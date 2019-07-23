import React, {Component} from 'react';
import SendButton from './sendButton';
import '../App.css';

class SendMessageForm extends Component {
constructor(props){
    super(props)
    this.state = {
        senderName: 'Dima',
        date: '',
        messageText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}

handleChange(e){
    this.setState({
        messageText: e.target.value
    })
}

onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
     this.handleSubmit(e)
      
  }
  
}



handleSubmit = (e) => {
    e.preventDefault()
    const d = new Date();
    function formatDate (date ){
        let hours = date.getHours();
        if(hours < 10) hours = '0' + hours;

        let minutes = date.getMinutes()
        if(minutes < 10) minutes = '0' + minutes;

        return hours + ":" + minutes
    }
    const dat = formatDate(d);

if(this.state.messageText === ''){
    
} else {
    const message = {
      type: 'message',
      senderId: this.props.userID,
      senderName: this.props.senderName,
      date: dat,
      messageText: this.state.messageText
    }

    this.props.sendMessage(JSON.stringify(message))
    this.setState({
        messageText: ''
    })
}
}


    render(){
        return(
            <form className='sendMessageForm'
            onSubmit={this.handleSubmit}>
                <textarea
                onChange={this.handleChange}
                onKeyDown={this.onEnterPress}
                value={this.state.messageText}
                placeholder = 'Type your message'
                type='text'
                />

                <SendButton onClick = {this.handleSubmit}
                            buttonText = {'Send message'} 
                            className='sendButton'
                />
            </form>
        )
    }
}




export default SendMessageForm;