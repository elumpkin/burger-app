import axios from 'axios'

const instance = axios.create({
    baseURL:'https://my-burger-app-f4e18.firebaseio.com/'
})

export default instance;