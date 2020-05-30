import http from './http'

class PostServices {
  getAll () {
    return http.get('/posts')
  }
}

export default new PostServices()
