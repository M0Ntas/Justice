import axios from "axios";

export const removeCategory = async (item) => {
  let removeProducts
  await axios.delete(`http://localhost:5000/api/category/${item._id}`, {headers:{
      "Authorization": localStorage.getItem('token')
    }})
    .then((res) => {
      console.log('====>data<====', res)
    })
    .catch(err => {
      console.log('====>err<====', err)
    })
  return removeProducts
}