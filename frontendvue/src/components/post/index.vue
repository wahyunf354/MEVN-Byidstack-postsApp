<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="input-group mb-3 mt-3">
          <input type="text" class="form-control">
          <div class="input-group-append">
            <button class=" btn btn-outline-secondary">Search</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6">

        <div class="title">
          <h1>Post List</h1>
        </div>

        <div class="card mb-3"  v-for="(post, i) in posts" :key="i">
          <div class="card-body">
            <h3 class="card-title">{{ post.title }}</h3>
            <h6 class="text-muted card-subtitle mb-2">{{ post.published ? 'Published' : 'Unpublished' }}</h6>
            <div class="card-text mb-3">{{ post.description }}</div>
            <a href="#" class="card-link">Edit</a>
          </div>
        </div>

        <button class="btn btn-danger btn-sm mb-4">Remove All</button>

      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../../services/PostService'

export default {
  name: 'post',
  data () {
    return {
      posts: []
    }
  },
  methods: {
    retrievePosts () {
      PostService.getAll()
        .then(result => {
          this.posts = result.data
          console.log(result.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.retrievePosts()
  }
}
</script>

<style>

</style>
