import axios from "axios";
// import store from '@/store/index'

const instance = axios.create({
  baseURL: 'https://mattyapi.easymedia.co.kr/',
  // headers: {
  //   Authorization: store.state.username,
  // }
})

function loginUser(username){
  return instance.post('api/Token', username);
}

export { loginUser }