import axios from "axios";

export const createPosition = async (data) => {
  let msg = {}
  await axios.post('http://localhost:5000/api/position', data, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      msg.status = true
    })
    .catch(err => {
      msg.text = err.response.data.message
      msg.status = false
    })
  return msg
}