import axios from "axios";

export const createCategory = async (data) => {
  let msg = {}
  await axios.post('http://localhost:5000/api/category', data, {headers:{
    "Authorization": localStorage.getItem('token')
    }})
    .then((res) => {
      msg.status = true
    })
    .catch(err => {
      msg.text = err.response.data.message
      msg.status = false
    })
  return msg
}