import React, {useState, useEffect, useContext} from 'react'
import ChatList from './ChatList'
import firebase from 'firebaseConfig'
import {AuthContext} from 'components/auth/authContext'

const Dashboard = (props) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [newChatFormVisible, setNewChatFormVisible] = useState(false)
  const [email, setEmail] = useState(null)
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)

  const selectChat = (chatIndex) => {
    console.log('selected a chat', chatIndex)
  }
  const newChatBtnClicked = () => {
    setSelectedChat(null)
    setNewChatFormVisible(true)
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
    <div>
      <ChatList 
        history={props.history}
        chats={chats}
        userEmail={email}
        newChatBtnFn={newChatBtnClicked}
        selectChatFn={selectChat}
        selectedChatIndex={selectedChat}
      />
    </div>
  )
}

export default Dashboard