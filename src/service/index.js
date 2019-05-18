import axios from 'axios'

export default async function request(packages, query = false) {
  
  return (
    axios(packages)
    .then(
      (res) => {
        let data = res.data
        if(query){
          const q = query.toLowerCase()
          data = data.filter(e => e.name.toLowerCase().indexOf(q) !== -1 || e.code === query )
        }
        return data
      }
    )
    .catch(er => er.response)
  )

}