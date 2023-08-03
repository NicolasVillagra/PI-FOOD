import axios from 'axios'

const solicitud = async ()=>{
    const numero = 10
    const apiRequest = await axios(`http://localhost:3001/recipes?name=pasta`)
    const data = apiRequest.data
    console.log(data);
}
console.log(solicitud());