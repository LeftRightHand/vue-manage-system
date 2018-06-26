
import axios from 'axios'

export function getLogin(data) {
  const url = '/users/login'
  return axios.post(url, {
    username: data.username,
    password: data.password
  }).then((res)=>{
    return Promise.resolve(res)
  })
}
