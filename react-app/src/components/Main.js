import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import NotFound from './NotFound'
import SignUp from './auth/SignUp'
import LogIn from './auth/LogIn'
import { Show as ShowUser } from './users/Show'
import { New as NewPost } from './posts/New'

const Main = ({
  domain,
  logIn,
  currentUser,
  loggedIn
}) => {

  const mainStyles = {
    height: 'calc(100vh - 75px)',
    backgroundColor: 'rgba(50, 50, 50, 1)',
    padding: '0 16.5% 0 16.5%',
    overflowX: 'scroll'
  }

  let routes
  if (loggedIn) {
    routes =
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/posts/new' element={<NewPost domain={domain} currentUser={currentUser} />} />
      <Route path='/users/:id' element={<ShowUser domain={domain} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  } else {
    routes =
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp domain={domain} logIn={logIn} />} />
      <Route path='/login' element={<LogIn domain={domain} logIn={logIn} />} />
      <Route path='/users/:id' element={<ShowUser domain={domain} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  }

  return(
    <main style={mainStyles}>
      {routes}
    </main>
  )
}

export default Main