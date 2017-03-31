
import Home from './components/Home.vue'
import Wallets from './components/Wallets.vue'

const routes = [
  { name: 'home', path: '/home', component: Home },
  { name: 'wallets', path: '/wallets', component: Wallets },
  { path: '*', redirect: { name: 'home' }}
]

export default routes
