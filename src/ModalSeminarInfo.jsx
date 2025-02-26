import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const ModalSeminarInfo = ({seminar, closeModal}) => {

  const[values,setValues] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/seminars/${seminar.id}`)
      .then(res => {
        setValues(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  function handleUpdate(e) {
    e.preventDefault()

    axios.put(`http://localhost:3000/seminars/${seminar.id}`, values)
      .then(res => {
        location.reload()
      })
      .catch(err => console.log(err))
  }


  
  return (
    <>

    <div className="card" style={{border: 'none'}}>
      <div className="card-body">
        <h5 className="mb-3">Update seminar id {seminar.id}</h5>
        <form onSubmit={handleUpdate}>
          <input 
          className="form-control mb-1" 
          type="text" name="title" 
          placeholder="Seminar title"
          value={values.title}
          onChange={e => setValues({...values, title: e.target.value})} />
          <input 
          className="form-control mb-1" 
          type="text" name="description" 
          placeholder="Seminar description"
          value={values.description}
          onChange={e => setValues({...values, description: e.target.value})} />
          <input 
          className="form-control mb-1" 
          type="text" 
          name="date" 
          placeholder="Seminar date"
          value={values.date}
          onChange={e => setValues({...values, date: e.target.value})} />
          <input 
          className="form-control mb-3" 
          type="text" 
          name="time" 
          placeholder="Seminar time"
          value={values.time}
          onChange={e => setValues({...values, time: e.target.value})} />
          <button type="submit" className="btn btn-primary" style={{marginRight: 10}}>Update Seminar</button>
          <button className="btn btn-danger" onClick={closeModal}>Close</button>
        </form>
      </div>
      </div>
    
    </>
  )
}

export default ModalSeminarInfo