import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import SignUp from './SignUp'
import LogIn from './LogIn'
import { Show as ShowUser } from './users/Show'

const Main = ({
  domain,
  logIn
}) => {
  const mainStyles = {
    height: 'calc(100vh - 75px)',
    backgroundColor: 'rgba(50, 50, 50, 1)',
    padding: '0 16.5% 0 16.5%'
  }

  return(
    <main style={mainStyles}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp domain={domain} logIn={logIn} />} />
        <Route path='/login' element={<LogIn domain={domain} logIn={logIn} />} />
        <Route path='/users/:id' element={<ShowUser domain={domain} />} />
      </Routes>
    </main>
  )
}

export default Main