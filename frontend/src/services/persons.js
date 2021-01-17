import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    newObject.id = Math.floor(Math.random()*1000000)+1
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

  const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`)
  }

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }