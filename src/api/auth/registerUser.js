import axios from "axios";
const PORT = process.env.REACT_APP_PORT;

export const registerUser = async (data) => {
  let msg = {}
  await axios.post(`http://localhost:${PORT}/api/auth/register`, data)
    .then((res) => {
      msg.status = true
    })
    .catch(err => {
      msg.text = err.response.data.message
      msg.status = false
    })
  return msg
}