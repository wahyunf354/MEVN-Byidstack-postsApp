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

        <div class="alert alert-danger" v-if="this.error" role="alert">
            {{ this.error }}
        </div>

        <div class="card mb-3"  v-for="(post, i) in posts" :key="i">
          <div class="card-body">
            <h3 class="card-title">{{ post.title }}</h3>
            <h6 class="text-muted card-subtitle mb-2">{{ post.published ? 'Published' : 'Unpublished' }}</h6>
            <div class="card-text mb-3">{{ post.description }}</div>
            <router-link :to="{ name: 'post-detail', params:{ id : post.id} }" class="card-link">Edit</router-link>
          </div>
        </div>

        <button class="btn btn-danger btn-sm mb-4" v-if="!isEmpty" @click="hendleDeleteAll()">Remove All</button>

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
      error: '',
      posts: [],
      message: '',
      isEmpty: false
    }
  },
  methods: {
    retrievePosts () {
      PostService.getAll()
        .then(result => {
          this.posts = result.data
          this.isEmpty = false
        })
        .catch(err => {
          this.error = err
        })
    },
    hendleDeleteAll () {
      if (confirm('Apakah anda yakin akan menghapus semua post?')) {
        PostService.deleteAll()
          .then(result => {
            this.message = result.data.message
            this.isEmpty = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted () {
    this.retrievePosts()
  }
}
</script>

<style>

</style>
