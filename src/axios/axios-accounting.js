import axios from 'axios'

export default axios.create({
    baseURL: 'https://moneykeep-c1c8a.firebaseio.com/'
})