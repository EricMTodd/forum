const Footer = () => {
  const footerStyles = {
    backgroundColor: 'black',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
  }

  return(
    <footer style={footerStyles}>
      Made with ❤️ <a href='https://ericmtodd.herokuapp.com'>Eric M. Todd</a>
    </footer>
  )
}

export default Footer