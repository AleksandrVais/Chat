import React, {Component}  from 'react';
import Title from'./components/title';
import MassageList from'./components/massageList';
import SendMessageForm from'./components/sendMessageForm';
import LoginForm from './components/loginForm';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.css';


const socket = new WebSocket("ws://localhost:8088");



class App extends Component {

  constructor() {
    super()
    this.state = {
      authentication: false,
      userID: '',
      userName: '',
      messages: []
    }
   
  }

    componentDidMount = () =>{

        socket.onmessage = response => {
        this.addMessage(response.data);
      }
  }

    addMessage = text =>{
          console.log(text)
          const IncomingMessage = JSON.parse(text);
          console.log(IncomingMessage);
        switch (IncomingMessage.type) {
          case 'message':
              this.setState((prevState) => ({messages: prevState.messages.concat(IncomingMessage)}));
          break;
          case 'system':
              this.setState(() => ({userID: IncomingMessage.userId,
                                    userName: IncomingMessage.name,
                                    authentication: IncomingMessage.authentication}));
              console.log(this.state.userID);
          break;
          case 'messageLog':
                this.setState((prevState) => ({messages: prevState.messages.concat(IncomingMessage.messageLog)}));
                console.log('It is message log');
        break;
          default:

              console.log('Error. Сan not identify message type');
            }

    }

  sendMessage = message => {
    
    socket.send(message);
    console.log(message);
  }

  getAuthenticationDataFB = data => {
      const clientData = {
        type: "userData",
        data: data
      }
      console.log(data)
    socket.send(JSON.stringify(clientData));
    
   
  }
  getAuthenticationDataVK = data => {
    const userName = data.session.user.first_name + ' ' + data.session.user.last_name;
    console.log(userName)
    const clientData = {
      type: "userData",
      data: {
        id: data.session.user.id,
        name: userName
      }
    }
    socket.send(JSON.stringify(clientData));
  }

  logOut = () => {
    console.log('button press')
    this.setState({
      authentication: false,
      userID: '',
      userName: '',
      messages: []
    })
  }

  render() {

    if(!this.state.authentication){
      return(
        <LoginForm 
        getAuthenticationDataFB = {this.getAuthenticationDataFB}
        getAuthenticationDataVK = {this.getAuthenticationDataVK}
        />
      );
    } else {
    return(

      <div>
        <Title 
          userName = {this.state.userName}
          logout = {this.logOut}
        />
         
        <MassageList messages={this.state.messages} 
                     userId = {this.state.userID}
        />
        <SendMessageForm 
                        userID = {this.state.userID}
                        sendMessage={this.sendMessage}
                        senderName = {this.state.userName}
        />

      </div>
      
    )}
  }
}

export default App;
