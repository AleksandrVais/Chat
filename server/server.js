const WebSocketServer = new require('ws');

const Mongoose = require('mongoose');
const userProfile = require('./usersSchema');
const newMessage = require('./messagesSchema');


const webSocketServer = new WebSocketServer.Server({port: 8088});


let clients = {};

webSocketServer.on('connection', function(ws){
var id = Math.random();
clients[id] = ws;
console.log('new connection ' + clients); 


// прием собщения от клиента
  ws.on('message', function(message){
  
  
   const incomingMessage = JSON.parse(message)
    if(incomingMessage.type === "userData"){

    findUser(incomingMessage, id)

    } else {

      sendToServerMessage(incomingMessage);

    console.log('New message: ' + incomingMessage.messageText);
    webSocketServer.clients.forEach(clients => {
      if(clients.readyState === WebSocketServer.OPEN) {
        clients.send(message);
      }
    });
    }
  });

  ws.on('close', function(){
    console.log('Connections cloused: ' + id);
    delete clients[id];
  })
})



// База сообщений

Mongoose.connect('mongodb+srv://AleksandrTest:aaa11@crf1-o7dqz.gcp.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true })
.then(() => console.log('Database connected'))
.catch(e => console.log(e));


// Новое сообщение
const sendToServerMessage = (incomingMessage) => {
  
  const message = new newMessage({
      type: incomingMessage.type,
      senderId: incomingMessage.senderId,
      senderName: incomingMessage.senderName,
      date: incomingMessage.date,
      messageText: incomingMessage.messageText
});

message.save(err => {
  if(err) throw err; 
  console.log('Message succsessfully saved');
});
}

// Отправка истории сообщений
const sendMessageLog = (id) => {
  
  newMessage.find((err, newMessage) => {
    if (err) throw err;   
    const messageLog = {
      type: 'messageLog',
      messageLog:  newMessage
    }
    clients[id].send(JSON.stringify(messageLog))
  });
};

//База клиентов

// Find user

const findUser = (incomingMessage, id) => {
  const userId = incomingMessage.data.id;

  userProfile.find({fb: userId},(err, userData) => {   
  if(err) throw err;
    console.log(userData);
   if(!userData.length) {
     createNewUser(incomingMessage,id);
   } else {
    
    const outcomingUserData = {
      type: 'system',
      name: userData[0].name,
      userId: userData[0].id,
      authentication: true
    }
    
    console.log('data: ' + outcomingUserData.fb)
    clients[id].send(JSON.stringify(outcomingUserData));
    sendMessageLog(id);

      console.log('Is Here: ' + userData)
   
   }
});
}

// Create new user
const createNewUser = (newUserData, idS) => {

    const user = new userProfile({
      id: '',
      name: newUserData.data.name,
      twitter: '',
      vk: '',
      fb: newUserData.data.id
    });

    userProfile.countDocuments((err, res) => {
      if(err) throw err;
      user.id = res + 1

      user.save(err => {
        if(err) throw err; 
        console.log('User succsessfully saved');
      });

      const outcomingUserData = {
        type: 'system',
        name: newUserData.data.name,
        userId: user.id,
        authentication: true
      }

      clients[idS].send(JSON.stringify(outcomingUserData));
      sendMessageLog(idS);

    })

}

console.log("Server start");