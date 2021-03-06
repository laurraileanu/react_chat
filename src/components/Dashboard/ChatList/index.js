import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
import NewChatModal from './NewChatModal'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import firebase from 'firebaseConfig'

const ChatList = (props) => {
  const {classes} = props
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectChat = (index) => {
    props.selectChatFn(index)
  }

  const userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === props.userEmail

  const signOut = () => {
    firebase.auth().signOut()
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  if(props.chats.length === 0) {
    return(
      <>
        <main className={classes.root}>
          <Button 
          variant="contained" 
          fullWidth
          color="primary" 
          className={classes.newChatBtn}
          onClick={openModal}
          >
            New chat
          </Button>
          <div style={{flex:'1',padding:'30px'}}>
            No chats available<br />Please select a new chat!!
          </div>
          <Button 
            variant="contained" 
            fullWidth
            color="secondary" 
            size="large"
            className={classes.newChatBtn}
            onClick={signOut} 
            >
              Sign out
          </Button>
        </main>

        <NewChatModal open={isModalOpen} onClose={closeModal} newChat={props.newChatBtnFn} />
      </>
    )
  }
  
  return (
    <>
      <main className={classes.root}>
        <Button 
          variant="contained" 
          fullWidth
          color="primary" 
          size="large"
          className={classes.newChatBtn}
          onClick={openModal}
          >
            New chat
          </Button>
        <List disablePadding={true}>
          {
            props.chats.map((chat, index) => {
              const username = chat.users.find(user => user !== props.userEmail)
              
              return(
                <div key={index}>
                  <ListItem
                    onClick={() => selectChat(index)}
                    className={classes.listItem}
                    selected={props.selectedChatIndex === index}
                    alignItems='flex-start'
                  >
                    <ListItemAvatar>
                      <Avatar>{username.split('')[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={username}
                      secondary={
                        <Typography component="span" color="textPrimary">
                          {chat.messages[chat.messages.length - 1].message.substring(0, 30)}...
                        </Typography>
                      }
                    >
                    </ListItemText>
                    {
                      chat.receiverHasRead === false  && !userIsSender(chat) ?
                      <ListItemIcon>
                        <NotificationImportant className={classes.unreadMessage}></NotificationImportant>
                      </ListItemIcon> : null
                    }
                  </ListItem>
                  <Divider/>
                </div>
              )
            })
          }
        </List>
        <Button 
          variant="contained" 
          fullWidth
          color="secondary" 
          size="large"
          className={classes.newChatBtn}
          onClick={signOut} 
          >
            Sign out
          </Button>
      </main>

      <NewChatModal open={isModalOpen} onClose={closeModal} newChat={props.newChatBtnFn} />
    </>
  )
}

export default withStyles(styles)(ChatList)