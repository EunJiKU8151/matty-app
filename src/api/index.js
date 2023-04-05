import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8081'
})

function loginUser(userdata){
  return instance.post('login', userdata);
}

export { loginUser }