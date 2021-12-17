import axios from "axios";
require('dotenv').config()
const PORT = process.env.REACT_APP_PORT;

export const authUser = async (data) => {
  let msg = {}
  await axios.post(`http://localhost:${PORT}/api/auth/login`, data)
    .then((res) => {
      msg.status = true
      msg.token = res.data.token
    })
    .catch(err => {
      msg.label = err.response.data.label
      msg.text = err.response.data.message
      msg.status = false
      console.log('====><====', err.response)
    })
  return msg
}