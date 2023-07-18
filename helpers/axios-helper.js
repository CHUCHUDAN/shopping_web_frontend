import axios from 'axios'

const shopAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  }
})

async function POST (url, params) {
  try {
    const res = await shopAPI.post(url, params)
    return res
  } catch (err) {
    return err.response
  }
}

export default  {
  POST
}