import React, {useState} from 'react'
import {withStyles, Button} from '@material-ui/core'
import Send from '@material-ui/icons/Send'
import InputBase from '@material-ui/core/InputBase';
import styles from './styles'

const AddMessage = (props) => {
  const {classes} = props
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitMessageFn(message)
    setMessage('')
  }

  const handleChange = (event) => {
    const {value} = event.target

    setMessage(value)

    if(event.keyCode === 13) {
      handleSubmit()
    }
  }

  const handleFocus = () => {
    props.messageReadFn(props.selectedChatIndex)
  }

  return(
    <form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.form}>
        <InputBase
          placeholder="Write message"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          required
          value={message}
          name="message"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </div>
      <Button type="submit" variant="contained"><Send /></Button>
    </form>
  )
}

export default withStyles(styles)(AddMessage)