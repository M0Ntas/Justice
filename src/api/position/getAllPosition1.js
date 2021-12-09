import axios from "axios";

export const getAllPosition1 = async () => {
  let products
  await axios.get('http://localhost:5000/api/position', {headers:{
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