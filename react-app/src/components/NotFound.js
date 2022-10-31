const NotFound = () => {
  const containerStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '96px'
  }

  return(

    <div id='not-found' style={containerStyles}>
      <h1>Are you lost...?</h1>
    </div>
  )
}

export default NotFound