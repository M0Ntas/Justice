import axios from "axios";

export const updateCategory = async (data) => {
  let products
  await axios.patch(`http://localhost:5000/api/category/${data._id}`, data, {headers:{
      "Authorization": localStorage.getItem('token')
    }})
    .then((res) => {
      products = res.data
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  return products
}