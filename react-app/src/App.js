import { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

const App = () => {
  const domain = 'http://localhost:3030'
  const [currentUser, setCurrentUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  const logIn = data => {
    setCurrentUser(data.user)
    setLoggedIn(data.logged_in)
  }

  useEffect(() => {
    axios.get(`${domain}/sessions/logged_in`)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => console.log(error))
  }, [])

  return(
    <div id='app'>
      <Nav loggedIn={loggedIn} currentUser={currentUser} />
      <Main domain={domain} logIn={logIn} />
      <Footer />
    </div>
  )
}

export default App