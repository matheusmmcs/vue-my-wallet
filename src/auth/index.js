
import {router} from '../index'
import localStorageObj from '../aux/LocalStorageObj'

// URL and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'sessions/create/'
const SIGNUP_URL = API_URL + 'users/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds).then(response => {
      // get body data
      let data = response.body;
      localStorage.setItem('id_token', data.id_token);
      localStorageObj.setItem('user', data.user);
      this.user.authenticated = true
      // Redirect to a specified route
      if(redirect) {
        router.push(redirect);
      }
    }, response => {
      // error callback
    });
  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then(response => {
      // get body data
      let data = response.body;
      localStorage.setItem('id_token', data.id_token);
      localStorageObj.setItem('user', data.user);
      this.user.authenticated = true
      // Redirect to a specified route
      if(redirect) {
        router.push(redirect);
      }
    }, response => {
      // error callback
    });
  },

  logout() {
    localStorage.removeItem('id_token');
    localStorageObj.removeItem('user');
    this.user.authenticated = false;
    router.push('home');
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  userId() {
    let user = localStorageObj.getItem('user');
    console.log(1, user);
    return user ? user.id : null;
  },

  getUsername() {
    let user = localStorageObj.getItem('user');
    console.log(2, user);
    return user ? user.username : null;
  },

// The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
