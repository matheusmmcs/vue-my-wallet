<template>

  <div class="row">
    <div class="col-sm-8 mw-col-center">

      <div>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
          <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
          <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
          <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
          <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="home">...</div>
          <div role="tabpanel" class="tab-pane" id="profile">...</div>
          <div role="tabpanel" class="tab-pane" id="messages">...</div>
          <div role="tabpanel" class="tab-pane" id="settings">...</div>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      wallets: [],
      wallet: {},
      showform: false
    }
  },
  methods: {
    getWallets() {
      let uid = auth.userId();
      this.$http.get('http://localhost:3001/api/wallet/'+uid, (data) => {
        this.wallets = data;
      }, { headers: auth.getAuthHeader() }).error((err) => console.log(err));
    },
    createWallet(event) {
      event.preventDefault();
      var payload = {description: this.wallet.description, userId: auth.userId()};
      var _this = this;
      this.$http.post('http://localhost:3001/api/wallet/', 
        payload, function (data, status, request) {
          _this.wallets = data;
          _this.wallet = {};
      }).error(function (data, status, request) {
          // handle error
          console.log(data)
      });
    }
  },
  // Check the users auth status before
  // allowing navigation to the route
  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }

}
</script>