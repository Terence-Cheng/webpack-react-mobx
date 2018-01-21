const topicPrimaryStyle = () => (
  {
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    title: {
      color: '#555',
    },
    tab: {
      // backgroundColor: theme.palette.primary[500],
      backgroundColor: 'pink',
      textAlign: 'center',
      display: 'inline-block',
      padding: '0 6px',
      color: '#fff',
      borderRadius: 3,
      marginRight: 10,
      fontSize: '12px',
    },
  }
)

const topicSecondaryStyle = () => (
  {
    root: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 3,
    },
    count: {
      textAlign: 'center',
      marginRight: 20,
    },
    userName: {
      marginRight: 20,
      color: '#9e9e9e',
    },
    accentColor: {
      color: 'lightBlue',
    },
  }
)

export {
  topicPrimaryStyle,
  topicSecondaryStyle,
}
