import Nav from './components/Nav'
import Main from './components/Main'
import Footer from './components/Footer'

const App = () => {
  const domain = 'http://localhost:3030'

  return(
    <div id='app'>
      <Nav />
      <Main domain={domain} />
      <Footer />
    </div>
  )
}

export default App