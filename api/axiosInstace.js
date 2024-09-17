import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    api_key: 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65',
  },
})

export default axiosInstance
