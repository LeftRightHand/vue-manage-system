
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
