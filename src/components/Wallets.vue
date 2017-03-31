<template>

  <div class="row">
    <div class="col-sm-8 mw-col-center">

      <div class="panel panel-info" v-if="showform">
        <div class="panel-heading mw-panel-title">
          Cadastrar Nova Carteira
          <button class="close" @click="showform=false"><span aria-hidden="true">&times;</span></button>
        </div>
        <!-- Form -->
        <form class="form-inline" @submit="createWallet">
          <div class="row mw-row-margin">
            <div class="form-group col-sm-8">
              <label for="description" class="col-sm-3 mw-label-line-height">Descrição</label>
              <div class="col-sm-9">
                <input type="text" class="form-control mw-width-100p" v-model="wallet.description" placeholder="Description">
              </div>
            </div>
            <input type="submit" class="btn btn-primary col-sm-4" value="Cadastrar" />
          </div>
        </form>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading mw-panel-title">
            Suas Carteiras
            <button v-if="!showform" class="btn btn-primary pull-right" @click="showform=true">
              Nova Carteira
            </button>
        </div>
        <!--<div class="panel-body">
          <button class="btn btn-warning pull-right" v-on:click="showForm()">Criar nova Carteira</button>
          <p>Controle suas despesas, receitas e empréstimos.</p>
        </div>-->

        <!-- List -->
        <ul class="list-group">
          <a class="list-group-item" v-if="!wallets.length">
            Você ainda não possui uma carteira? Adicione uma agora mesmo :) 
          </a>
          <a class="list-group-item" v-for="wallet in wallets" @click="openWallet(wallet.id)">
            {{ wallet.id }} | {{ wallet.description }}
          </a>
        </ul>
      </div>

      </div>

    </div>
  </div>
  
</template>

<script>
import auth from '../auth'

export default {
  mounted: function() {
    this.$nextTick(function () {
      // code that assumes this.$el is in-document
      this.getWallets();
    })
  },
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

      this.$http.get('http://localhost:3001/api/wallet/'+uid, {
            headers: auth.getAuthHeader()
        }).then(response => {
          let data = response.body;
          this.wallets = data;
      }, response => {
        // error callback
      });

    },
    createWallet(event) {
      event.preventDefault();
      var payload = {description: this.wallet.description, userId: auth.userId()};
      var _this = this;

      this.$http.post('http://localhost:3001/api/wallet/', payload, {
            headers: auth.getAuthHeader()
        }).then(response => {
          let data = response.body;
          _this.wallets = data;
          _this.wallet = {};
      }, response => {
        // error callback
      });
    },
    openWallet(id) {
      console.log('open wallet', id);
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