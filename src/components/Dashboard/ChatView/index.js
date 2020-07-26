import React, {useEffect} from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from './styles'

const ChatView = (props) => {
  const {classes} = props
  const username = props.chat.users.find(user => user !== props.userEmail)

  useEffect(() => {
    // TODO cand selectezi alt chat nu si mai face scroll
    const container = document.getElementById('chatview-container')
    if(container) {
      container.scrollTo(0, container.scrollHeight)
    }
  }, [])

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
                {message.sender === props.userEmail ? 'You' : message.sender}:
              </span>
              {message.message}
            </div>  
          )
        }
      </main>
    </>
  )
}

export default withStyles(styles)(ChatView)