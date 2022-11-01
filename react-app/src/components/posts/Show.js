import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Show = ({
  domain
}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({})

  useEffect(() => {
    axios.get(`${domain}/posts/${params.id}`)
    .then(response => {
      if (response.data.successful) {
        setPost(response.data.post)
      } else {
        navigate('/404')
      }
    })
    .catch(error => console.log(error))
  }, [params.id])

  return(
    <div className='show-post'>
      <h1 style={{marginTop: '0'}}>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export { Show }