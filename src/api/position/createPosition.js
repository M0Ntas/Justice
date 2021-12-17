import axios from "axios";
const PORT = process.env.REACT_APP_PORT;

export const createPosition = async (data) => {
  let msg = {}
  await axios.post(`http://localhost:${PORT}/api/position`, data, {
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