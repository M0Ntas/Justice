import axios from "axios";
const PORT = process.env.REACT_APP_PORT;

export const getUser = async () => {
  let products
  await axios.get(`http://localhost:${PORT}/api/user`, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      products = res.data
      console.log('====>res<====', res)
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  return products
}