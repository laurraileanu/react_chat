import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
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

const ChatList = (props) => {
  const {classes} = props

  const newChat = () => {
    console.log('new chat click')
  }

  const selectChat = (index) => {
    console.log('select chat', index)
  }

  if(props.chats.length === 0) {
    return(
      <main className={classes.root}>
        <Button 
        variant="contained" 
        fullWidth
        color="primary" 
        className={classes.newChatBtn}
        onClick={newChat} 
        >
          New chat
        </Button>
        No chat available
      </main>
    )
  }
  
  return (
    <main className={classes.root}>
      <Button 
        variant="contained" 
        fullWidth
        color="primary" 
        className={classes.newChatBtn}
        onClick={newChat} 
        >
          New chat
        </Button>
      <List>
        {
          props.chats.map((chat, index) => {
            const username = chat.users.filter(user => user !== props.userEmail)[0]
            
            return(
              <div key={index}>
                <ListItem 
                  onClick={() => selectChat(index)}
                  className={classes.listItem}
                  selected={props.selectChatIndex === index}
                  alignItems='flex-start'
                >
                  <ListItemAvatar>
                    <Avatar>{username.split('')[0]}</Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={username}
                    secondary={
                      <>
                        <Typography component="span" color="textPrimary">
                          {chat.messages[chat.messages.length - 1].message.substring(0, 30)}
                        </Typography>
                      </>
                    }
                  >
                  </ListItemText>
                </ListItem>
                <Divider/>
              </div>
            )
          })
        }
      </List>
    </main>
  )
}

export default withStyles(styles)(ChatList)