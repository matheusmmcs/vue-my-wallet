<template>
  <div class="col-sm-6">
      <div class="panel panel-primary">
        <div class="panel-heading">
            <h1 class="panel-title mw-panel-title">Log In</h1>
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
          <button class="btn btn-primary" @click="submitLogin()">Access</button>
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
      submitLogin() {
        var credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }
        // We need to pass the component's this context
        // to properly make use of http in the auth service
        auth.login(this, credentials, 'wallets')
      }
    }
  
}
</script>