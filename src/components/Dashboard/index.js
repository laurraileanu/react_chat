import React, {useState, useEffect, useContext} from 'react'
import {Box} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import ChatList from './ChatList'
import ChatView from './ChatView'
import firebase from 'firebaseConfig'
import {AuthContext} from 'components/auth/authContext'

const Dashboard = (props) => {
  const [chats, setChats] = useState([])
  const [email, setEmail] = useState(null)
  const [selectedChatIndex, setSelectedChatIndex] = useState(null)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    firebase
    .firestore()
    .collection('chats')
    .where('users','array-contains', currentUser.email)
    .onSnapshot(result => {
      const _chats = result.docs.map(_doc => _doc.data())
      setEmail(currentUser.email)
      setChats(_chats)
    })
  }, [])

  const selectChat = (chatIndex) => {
    setSelectedChatIndex(chatIndex)
    messageRead(chatIndex)
  }
  
  const buildDocKey = (friend) => [email, friend].sort().join(':') //user1:user2 - alphabetical cuz of .sort()

  const submitMessage = (msg) => {
    const docKey = buildDocKey(chats[selectedChatIndex].users.find(user => email !== user))

    firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timestamp: Date.now()
        }),
        receiverHasRead: false,
      })

  }

  //vezi daca sender ul ultimului mesaj nu sunt eu
  const clickedChatWHereNotSender = (chatIndex) => chats[chatIndex].messages[chats[chatIndex].messages.length - 1].sender !== email

  const messageRead = (index) => {
    const docKey = buildDocKey(chats[index].users.find(user => email !== user))

    if(clickedChatWHereNotSender(index)) {
      firebase 
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({receiverHasRead: true})
    } else {
      console.log('Eu am trimis mesajul asta')
    }
  }

  const newChatBtnClicked = async (user, message) => {
    const docKey = buildDocKey(user)
    const modifiedDoc = firebase.firestore().collection('chats').doc(docKey) 
    //check if the doc already exists if yes update mesages else create doc

    await
      modifiedDoc
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          modifiedDoc
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              sender: email,
              message: message,
              timestamp: Date.now()
            }),
            receiverHasRead: false,
          })
        } else {
          modifiedDoc
          .set({
            messages: [
              {
                message: message,
                sender: currentUser.email
              }
            ],
            receiverHasRead: false,
            users: [user, currentUser.email]
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        }
      })

      setSelectedChatIndex(null)
  }


  return(
    <Box display="flex">
      <ChatList 
        history={props.history}
        chats={chats}
        userEmail={email}
        newChatBtnFn={newChatBtnClicked}
        selectChatFn={selectChat}
        selectedChatIndex={selectedChatIndex}
      />
      <Box display="flex" height="100vh" flexDirection="column" flexGrow={1}>
        {
          chats[selectedChatIndex] ?
          <ChatView 
            chat={chats[selectedChatIndex]} 
            userEmail={email} 
            submitMessageFn={submitMessage}
            selectedChatIndex={selectedChatIndex}
            messageReadFn={messageRead}
          />
          :
          <Box m={3}>
            <Alert severity="error">No chat selected</Alert>
          </Box>
        }
      </Box>
    </Box>
  )
}

export default Dashboard