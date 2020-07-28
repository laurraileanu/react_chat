import React, {useEffect} from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'
import AddMessage from './AddMessage'

const ChatView = (props) => {
  const {classes} = props
  const username = props.chat.users.find(user => user !== props.userEmail)

  const submitMessage = (msg) => {
    props.submitMessageFn(msg)
  }

  useEffect(() => {
    const container = document.getElementById('chatview-container')
    if(container) {
      container.scrollTo(0, container.scrollHeight)
    }
  }, [props.chat])

  return(
    <>
      <div className={classes.chatHeader}>
        Your conversation with {username}
      </div>
      <main id='chatview-container' className={classes.content}>
        {
          props.chat.messages.map((message, index) => 
            <div key={index} className={message.sender === props.userEmail ? classes.userSent : classes.friendSent}>
              <span className={classes.span}>
                <span>
                  {message.sender === props.userEmail ? 'You' : message.sender}:
                </span>
                <span>
                  {
                    new Intl
                      .DateTimeFormat('ro-RO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                      .format(message.timestamp)
                  }
                </span>
              </span>
              {message.message}
            </div>  
          )
        }
      </main>
      <AddMessage 
        sender={props.userEmail} 
        selectedChatIndex={props.selectedChatIndex}
        submitMessageFn={submitMessage} 
        messageReadFn={props.messageReadFn}
      />
    </>
  )
}

export default withStyles(styles)(ChatView)