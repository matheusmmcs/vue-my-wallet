<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            </button>
            <router-link class="navbar-brand" to="/home">MyWallet App</router-link>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <!-- Links -->
                <li v-if="user.authenticated">
                    <router-link to="/wallets" active-class="active">Wallets</router-link>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right" v-if="user.authenticated">
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ username() }} <span class="caret"></span></a>
                <ul class="dropdown-menu">
                <li><a href="#">Profile</a></li>
                <li role="separator" class="divider"></li>
                <li>
                    <a @click="logout()">Logout</a>
                </li>
                </ul>
            </li>
            </ul>
        </div><!-- /.navbar-collapse -->
        </div>
    </nav>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      user: auth.user
    }
  },
  methods: {
    logout() {
        auth.logout();
    },
    username: function() {
        return auth.getUsername()
    }
  }
}
</script>
