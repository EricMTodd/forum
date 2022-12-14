import { Routes, Route } from 'react-router-dom'
import NotFound from './NotFound'
import SignUp from './auth/SignUp'
import LogIn from './auth/LogIn'
import { Show as ShowUser } from './users/Show'
import { New as NewPost } from './posts/New'
import { Index as PostsIndex } from './posts/Index'
import { Show as ShowPost } from './posts/Show'
import { Edit as EditUser } from './users/Edit'

const Main = ({
  domain,
  logIn,
  currentUser,
  loggedIn,
  logOut
}) => {

  const mainStyles = {
    height: 'calc(100vh - 75px)',
    backgroundColor: 'black',
    padding: '0 16.5% 0 16.5%',
    overflowX: 'scroll'
  }

  let routes
  if (loggedIn) {
    routes =
    <Routes>
      <Route path='/' element={<PostsIndex domain={domain} loggedIn={loggedIn} />} />
      <Route path='/posts/new' element={<NewPost domain={domain} currentUser={currentUser} />} />
      <Route path='/users/:id' element={<ShowUser domain={domain} currentUser={currentUser} loggedIn={loggedIn} logOut={logOut} />} />
      <Route path='/posts/:id' element={<ShowPost domain={domain} loggedIn={loggedIn} currentUser={currentUser} />} />
      <Route path='/users/:id/edit' element={<EditUser domain={domain} currentUser={currentUser} />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  } else {
    routes =
    <Routes>
      <Route path='/' element={<PostsIndex domain={domain} />} />
      <Route path='/signup' element={<SignUp domain={domain} logIn={logIn} />} />
      <Route path='/login' element={<LogIn domain={domain} logIn={logIn} />} />
      <Route path='/users/:id' element={<ShowUser domain={domain} />} />
      <Route path='/posts/:id' element={<ShowPost domain={domain} />} />
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