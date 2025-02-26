import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const Read = () => {

  const[data,setData] = useState([])

  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3000/seminars/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  const{title,description,date,time} = data

  return (

  <>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Details seminar id {id}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{title}</li>
        <li className="list-group-item">{description}</li>
        <li className="list-group-item">{date}</li>
        <li className="list-group-item">{time}</li>
      </ul>
      <div className="card-body">
        <Link to={`/update/${id}`} className="btn btn-warning" style={{marginRight: 10}}>Edit</Link>
        <Link to="/" className="btn btn-success">Go back</Link>
      </div>
    </div>
  </>

  )
}

export default Read