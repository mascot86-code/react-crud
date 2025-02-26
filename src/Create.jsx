import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SeminarsContext from "./context/seminars-context"
import uuid from 'react-uuid';


const Create = () => { 

  const uid = uuid()

  const[seminar,setSeminar] = useState({
    id: uid,
    title: "",
    description: "",
    date: "",
    time: "",
  })
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    axios.post('http://localhost:3000/seminars/', seminar)
      .then(res => {
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  return (
      <>
      <div className="card">
        <h5>Add new seminar</h5>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input 
          className="form-control mb-1" 
          type="text" name="title" 
          placeholder="Seminar title"
          onChange={e => setSeminar({...seminar, title: e.target.value})} />
          <input 
          className="form-control mb-1" 
          type="text" name="description" 
          placeholder="Seminar description"
          onChange={e => setSeminar({...seminar, description: e.target.value})} />
          <input 
          className="form-control mb-1" 
          type="date" 
          name="date" 
          placeholder="Seminar date"
          onChange={e => setSeminar({...seminar, date: e.target.value})} />
          <input 
          className="form-control mb-3" 
          type="time" 
          name="time" 
          placeholder="Seminar time"
          onChange={e => setSeminar({...seminar, time: e.target.value})} />
          <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>Create Seminar</button>
          <Link to="/" className="btn btn-success">Go back</Link>
        </form>
      </div>
      </div>
      </>
  )
}

export default Create