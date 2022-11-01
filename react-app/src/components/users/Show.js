import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Show = ({
  domain
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`${domain}/users/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setUser(response.data.user)
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  return(
    <div className='show-user'>
      <h1>{user.handle}</h1>
    </div>
  )
}

export { Show }