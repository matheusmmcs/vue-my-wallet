<template>
  <div class="row" v-if="!user.authenticated">
    <login></login>
    <sign-up></sign-up>
  </div>
</template>

<script>
import Login from './Login.vue';
import Signup from './Signup.vue';
import auth from '../auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },
  components:{
      'login': Login,
      'sign-up' : Signup
  }
}
</script>