import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
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
    Cookies.set('persistenceToken', data.user.persistence_token, { expires: 14 })
  }

  useEffect(() => {
    let cookie = Cookies.get('persistenceToken')
    if (cookie) {
      console.log(cookie)
      axios.post(`${domain}/sessions/logged_in`, {
        persistence_token: cookie
      })
      .then(response => {
        console.log(response.data)
        logIn(response.data)
      })
      .catch(error => console.log(error))
    }
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