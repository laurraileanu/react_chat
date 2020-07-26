const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "300px",
    height: "100vh",
    boxShadow: '0px 0px 2px black',
    display:'flex',
    flexDirection: 'column',
    '& ul' : {
      flex: '1'
    }
  },
  listItem: {
    cursor: 'pointer'
  },
  newChatBtn: {
    borderRadius: '0px'
  },
  unreadMessage: {
    color: 'red',
    position: 'absolute',
    top: '0',
    right: '5px'
  }
});

export default styles;