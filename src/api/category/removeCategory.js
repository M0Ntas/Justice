import axios from "axios";
const PORT = process.env.REACT_APP_PORT;

export const removeCategory = async (item) => {
  let removeProducts
  await axios.delete(`http://localhost:${PORT}/api/category/${item._id}`, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      console.log('====>data<====', res)
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  return removeProducts
}