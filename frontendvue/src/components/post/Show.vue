<template>
  <div class="container">
    <div class="row justify-content-center pt-5">
      <div class="col-md-8 col-12">
        <form v-if="!isError" action="" @click.prevent>
          <div class="form-groub">
            <label for="title">Title</label>
            <input v-model="post.title" type="text" class="form-control" id="title" required>
          </div>
          <div class="form-groub mt-2">
            <label for="desc" >Description</label>
            <textarea v-model='post.description' id="desc" cols="10" rows="4" class="form-control" required></textarea>
          </div>
          <div class="form-groub mt-2">
            <label for="">Status :  </label> {{ post.published ? 'Published' : 'Unpublished' }}
          </div>
          <button  class="btn btn-outline-primary btn-sm mt-3 mr-2" @click="hendlePublis()">{{ post.published ? 'Unpublished' : 'Published' }}</button>
          <button v-if="isLoading" class="btn btn-secondary btn-sm mt-3">Loading</button>
          <button v-else class="btn btn-outline-success btn-sm mt-3 mr-2" @click="hendleUpdate()">Update</button>
          <button  class="btn btn-outline-danger btn-sm mt-3 mr-2" @click="hendleDelete(post.id)">Delete</button>
          <div class="alert mt-3" v-if="message">
            {{ message }}
          </div>
        </form>
        <div class="alert alert-danger mt-3" v-else>
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../../services/PostService'
export default {
  name: 'post-update',
  data () {
    return {
      isLoading: false,
      isError: false,
      post: {
        id: null,
        title: '',
        description: '',
        published: false
      },
      message: ''
    }
  },
  methods: {
    retrievePost (id) {
      PostService.get(id)
        .then(result => {
          this.post.title = result.data.title
          this.post.description = result.data.description
          this.post.id = result.data.id
          this.post.published = result.data.published
        })
        .catch(err => {
          this.isError = true
          this.message = err
        })
    },
    hendlePublis () {
      if (this.post.published) {
        this.post.published = false
      } else {
        this.post.published = true
      }
    },
    hendleUpdate () {
      const data = {
        title: this.post.title,
        description: this.post.description,
        published: this.post.published
      }

      PostService.update(data, this.post.id)
        .then(result => {
          this.isError = false
          this.message = result.data.message
          setTimeout(() => {
            this.$router.push('/posts')
          }, 1000)
        })
        .catch(err => {
          this.isError = true
          this.message = err
        })
    },
    hendleDelete (id) {
      if (confirm('Apakah Anda Yakin Akan Menghapus Post Ini?')) {
        PostService.delete(id)
          .then(result => {
            alert(result.data.message)
            this.$router.push('/posts')
          })
          .catch(err => {
            this.message = err
          })
      }
    }
  },
  mounted () {
    this.retrievePost(this.$route.params.id)
  }
}
</script>
