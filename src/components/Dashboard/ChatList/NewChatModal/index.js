import React, {useState, useEffect, useContext} from 'react'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from 'firebaseConfig'
import {AuthContext} from 'components/auth/authContext'

const NewChatModal = (props) => {
  const { currentUser } = useContext(AuthContext)
  const { onClose, open, availableChats } = props;
  const [users, setUsers] = useState(null)
  const [message, setMessage] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .onSnapshot(results => {
        const _users = results.docs
          .filter(_doc => _doc.data().email !== currentUser.email )
          .map(_doc => _doc.data())
          
        setUsers(_users)
      })
  }, [])

  const handleAutocomplete = (event, value) => {
    event.preventDefault()
    const {email} = value

    setSelectedUser(email)
  }
  const handleChange = (event) => {
    const {value} = event.target

    setMessage(value)
  }

  const handleClose = () => {
    onClose();
  };

  const sendFormData = (event) => {
    event.preventDefault();

    props.newChat(selectedUser, message)

    onClose();
  }
  
  return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
      <DialogTitle id="form-dialog-title">Start a new chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Find the user you want to chat with
        </DialogContentText>
        <form onSubmit={sendFormData}>
          <Autocomplete
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option.email}
            renderInput={(params) => <TextField {...params} label="Select user"/>}
            onChange={handleAutocomplete}
          />
          <TextField
            margin="dense"
            label="Message"
            type="text"
            onChange={handleChange}
            required
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default withStyles(styles)(NewChatModal)