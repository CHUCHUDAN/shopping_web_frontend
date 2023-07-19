import axios from 'axios'

const shopAPI = (token) => {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

async function POST (url, params, token) {
  try {
    const res = await shopAPI(token).post(url, params)
    return res
  } catch (err) {
    return err.response
  }
}

async function GET(url, params, token ) {
  try {
    const res = await shopAPI(token).get(url, params)
    return res
  } catch (err) {
    return err.response
  }
}

export default  {
  POST,
  GET
}