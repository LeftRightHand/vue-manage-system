
import axios from 'axios'

export function addCategories(name) {
  const url = '/categories/add'
  return axios.post(url, {
      name: name,
  }).then((res)=>{
      return Promise.resolve(res)
  })
}

export function editCategories(data) {
  const url = '/categories/edit'
  return axios.post(url, {
      id: data.id,
      name: data.name
  }).then((res)=>{
      return Promise.resolve(res)
  })
}

export function deleteCategories(id) {
  const url = '/categories/delete'
  return axios.post(url, {
      id: id
  }).then((res)=>{
      return Promise.resolve(res)
  })
}

export function getCategories(data) {
  const url = '/categories/list'
  return axios.get(url, {
      params:{
          page: data.page || 1,
          pageSize: data.pageSize || 10
      }
  }).then((res)=>{
      return Promise.resolve(res)
  })
}
