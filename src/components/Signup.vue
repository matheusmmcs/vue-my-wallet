<template>
  <div class="col-sm-6">

    <div class="panel panel-info">
      <div class="panel-heading">
          <h1 class="panel-title mw-panel-title">Sign Up</h1>
      </div>
      <div class="panel-body">
        <form>
          <div class="alert alert-danger" v-if="error">
            <p>{{ error }}</p>
          </div>
          <div class="form-group">
            <input type="text" class="form-control"
              placeholder="Enter your username" v-model="credentials.username"/>
            </div>
            <div class="form-group">
              <input type="password" class="form-control"
                placeholder="Enter your password" v-model="credentials.password"/>
            </div>
            <button class="btn btn-info" @click="submit()">Create Account</button>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      auth.signup(this, credentials, 'wallets')
    }
  }
}
</script>