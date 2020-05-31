<template>
  <div class="container">
    <div class="row justify-content-center pt-5">
      <div class="col-md-8 col-12">
        <form action="" @click.prevent>
          <div class="form-groub">
            <label for="title">Title</label>
            <input v-model="post.title" type="text" class="form-control" id="title" required>
          </div>
          <div class="form-groub mt-4">
            <label for="desc" >Description</label>
            <textarea v-model='post.description' id="desc" cols="10" rows="4" class="form-control" required></textarea>
          </div>
          <div v-if="error.errService" class="alert alert-danger mt-3" role="alert">Maaf Terjadi Kesalahan</div>
          <div v-if="error.errForm" class="alert alert-danger mt-3" role="alert">Maaf Form Harus Diisi Semua</div>

          <button v-if="isLoading" class="btn btn-secondary btn-sm mt-2">Loading</button>
          <button v-else class="btn btn-outline-success btn-sm mt-2" @click="postSubmit()">Simpan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../../services/PostService'

export default {
  name: 'add-form',
  data () {
    return {
      error: {
        errService: false,
        errForm: false
      },
      isLoading: false,
      post: {
        id: null,
        title: '',
        description: '',
        published: false
      }
    }
  },
  methods: {
    postSubmit () {
      const data = {
        title: this.post.title,
        description: this.post.description
      }
      if (data.title || data.description) {
        this.isLoading = true
        PostService.crete(data)
          .then(result => {
            this.post.id = result.data.id
            this.isLoading = false
            this.$router.push('posts')
          })
          .catch(() => {
            this.error.errService = true
            this.isLoading = false
          })
      } else {
        this.error.errForm = true
      }
    }
  }
}
</script>

<style>

</style>
