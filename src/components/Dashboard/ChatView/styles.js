const styles = theme => ({

  content: {
    padding: '25px',
    flex:'1',
    overflowY: 'auto'
  },

  userSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  friendSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#dcdcdc',
    color: 'black',
    width: '300px',
    borderRadius: '10px'
  },

  chatHeader: {
    height: '50px',
    backgroundColor: theme.palette.primary.main,
    fontSize: '18px',
    textAlign: 'center',
    color: 'white',
    paddingTop: '10px',
    boxSizing: 'border-box',
  },

  span: {
    fontSize: '10px',
    display: 'block'
  }

});

export default styles;