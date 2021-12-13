import axios from "axios";

export const registerUser = async (data) => {
  let msg = {}
  await axios.post('http://localhost:5000/api/auth/register', data)
    .then((res) => {
      msg.status = true
    })
    .catch(err => {
      msg.text = err.response.data.message
      msg.status = false
    })
  return msg
}