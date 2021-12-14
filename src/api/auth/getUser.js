import axios from "axios";

export const getUser = async () => {
  let products
  await axios.get('http://localhost:5000/api/user', {
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