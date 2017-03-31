<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';

export default {
  data() {
    return { }
  },
  components:{
      'nav-bar': NavBar
  }
}
</script>
