
import axios from 'axios'

export function commitArticle(data) {
    const url = '/article/publish'
    return axios.post(url, {
        id: data.id,
        title: data.title,
        content: data.content,
        editType: data.editType
    }).then((res)=>{
        return Promise.resolve(res)
    })
}

export function getArticleList(data) {
    const url = '/article/list'
    return axios.post(url, {
        page: data.page || 1,
        pageSize: data.pageSize || 10
    }).then((res)=>{
        return Promise.resolve(res)
    })
}

export function delArticle(id) {
    const url = '/article/delete'
    console.log(id)
    return axios.post(url, {
        id: id,
    }).then((res)=>{
        return Promise.resolve(res)
    })
}
