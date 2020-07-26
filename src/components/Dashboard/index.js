import React, {useState, useEffect, useContext} from 'react'
import {Box} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import ChatList from './ChatList'
import ChatView from './ChatView'
import firebase from 'firebaseConfig'
import {AuthContext} from 'components/auth/authContext'

const Dashboard = (props) => {
  const [selectedChatIndex, setSelectedChatIndex] = useState(null)
  const [selectedChat, setSelectedChat] = useState(null)
  const [email, setEmail] = useState(null)
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)

  const selectChat = (chatIndex) => {
    let filteredChat = chats.find((_chat, _index) => _index === chatIndex)
    setSelectedChatIndex(chatIndex)
    setSelectedChat(filteredChat)
  }
  
  const submitMessage = (msg) => {
    console.log(msg)
    // firebase
    //   .firestore()
    //   .collection('chats')
    //   .where('chatId','==', selectedChat.chatId)
    //   .update({
    //     messages: firebase.firestore.FieldValue.arrayUnion({
    //       sender: email,
    //       message: msg,
    //       timestamp: Date.now()
    //     }),
    //     receiverHasRead: false,
    //   })

  }

  const newChatBtnClicked = () => {
    setSelectedChat(null)
  }

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
          selectedChat ?
          <ChatView chat={selectedChat} userEmail={email} submitMessageFn={submitMessage}/>
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