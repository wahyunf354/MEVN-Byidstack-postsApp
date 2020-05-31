import http from './http'

class PostServices {
  getAll () {
    return http.get('/posts')
  }

  get (id) {
    return http.get(`/posts/${id}`)
  }

  crete (data) {
    return http.post('/posts', data)
  }

  update (data, id) {
    return http.put(`/posts/${id}`, data)
  }

  delete (id) {
    return http.delete(`/posts/${id}`)
  }

  deleteAll () {
    return http.delete('/posts')
  }
}

export default new PostServices()
