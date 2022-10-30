import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Show = ({
  domain
}) => {
  const params = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`${domain}/users/${params.id}`)
    .then(response => {
      setUser(response.data.user)
    })
    .catch(error => console.log(error))
  }, [])

  return(
    <div className='show-user'>
      <h1 style={{marginTop: '0'}}>{user.handle}</h1>
    </div>
  )
}

export { Show }