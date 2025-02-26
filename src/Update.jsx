import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const Update = () => {

  const {id} = useParams()
  const[seminar,setSeminar] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3000/seminars/${id}`)
      .then(res => {
        setSeminar(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  function handleUpdate(e) {
    e.preventDefault()

    axios.put(`http://localhost:3000/seminars/${id}`, seminar)
      .then(res => {
        navigate('/')
      })
      .catch(err => console.log(err))
  }


  return (
    <>

    <div className="card">
        <h5>Update seminar id {id}</h5>
      <div className="card-body">
        <form onSubmit={handleUpdate}>
          <input 
          className="form-control mb-1" 
          type="text" name="title" 
          placeholder="Seminar title"
          value={seminar.title}
          onChange={e => setSeminar({...seminar, title: e.target.value})} />
          <input 
          className="form-control mb-1" 
          type="text" name="description" 
          placeholder="Seminar description"
          value={seminar.description}
          onChange={e => setSeminar({...seminar, description: e.target.value})} />
          <input 
          className="form-control mb-1" 
          type="text" 
          name="date" 
          placeholder="Seminar date"
          value={seminar.date}
          onChange={e => setSeminar({...seminar, date: e.target.value})} />
          <input 
          className="form-control mb-3" 
          type="text" 
          name="time" 
          placeholder="Seminar time"
          value={seminar.time}
          onChange={e => setSeminar({...seminar, time: e.target.value})} />
          <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>Update Seminar</button>
          <Link to="/" className="btn btn-success">Go back</Link>
        </form>
      </div>
      </div>

    </>
  )
}

export default Update