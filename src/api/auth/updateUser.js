import axios from "axios";

export const updateUser = async (data) => {
  let products = {}
  await axios.patch(`http://localhost:5000/api/user/${data._id}`, data, {
    headers: {
      "Authorization": localStorage.getItem('token')
    }
  })
    .then((res) => {
      products = {
        ...res.data
      }
    })
    .catch(err => {
      console.log('====>err<====', err)
      products.error = err.response.data.message
    })
  return products
}