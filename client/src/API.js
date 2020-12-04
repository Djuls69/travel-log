import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const listLogEntries = async () => {
  const res = await axios.get(`${API_URL}/logs`)
  return res.data
}

export const createLogEntries = async entry => {
  const res = await axios.post(`${API_URL}/logs`, entry, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return res.data
}
