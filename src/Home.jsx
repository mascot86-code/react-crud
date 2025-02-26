import { useContext, useState, useEffect } from "react"
import { Link} from "react-router-dom";
import TotalSeminars from "./TotalSeminars";
import axios from "axios";
import { Modal, Empty, Typography, Input } from 'antd';
import ModalSeminarInfo from "./ModalSeminarInfo";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdEdit, MdDelete, MdAddComment } from "react-icons/md";


const Home = () => {

  const year = new Date().getFullYear()
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('')
  const [seminar, setSeminar] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchData() {
    await axios.get('http://localhost:3000/seminars')
      .then(res => {
        if(res.status == 200) {
          setData(res.data.map(seminar =>{
            return{
              ...seminar,
              city: 'Moscow',
              limitation: false
            }
          }))   
        } else {
          throw new Error('Failed to fetch data')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
      fetchData()
  }, []);

  function deleteHandler(id) {
    if(confirm('Are you sure you want to delete this seminar?')) {
      axios.delete(`http://localhost:3000/seminars/${id}`)
        .then(res => {
          location.reload()
        })
        .catch(err => console.log(err))
    }
  }

  function detailsHandler(id) {
    setIsModalOpen(true)
    setSeminar(data.find(seminar => seminar.id == id))
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const filtered = data.filter(item => (item.title).toLowerCase().includes(filter.toLowerCase()))

  return (
    <>

        {data.length <= 0 ? (

          <Empty

            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            styles={{ image: { height: 60 } }}
            description={
              <Typography.Text>
                To see the data, run -- npm run server
              </Typography.Text>
            }
          >
          </Empty>

          ):(

          <>

            <h1 className="mb-4">Seminars {year}</h1>

            <div className="toolbar mb-4">

              <Input 
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Enter a keyword to search"
              />
              
              <Link to="/create" className="btn btn-success"><MdAddComment /> Add new</Link>
              </div>

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th> Title</th>
                  <th>Description</th>
                  <th>City</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((item, index) => (
              
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.city}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td><Link to={`/read/${item.id}`} className="btn btn-warning"><BiSolidCommentDetail /></Link></td>
                    <td><button className="btn btn-primary" onClick={() => detailsHandler(item.id)}><MdEdit /></button></td>
                    <td><Link className="btn btn-danger" onClick={() => deleteHandler(item.id)}><MdDelete /></Link></td>
                  </tr>
                
                ))}
              </tbody>
            </table>

            
              <TotalSeminars length={filtered.length}/>
            

          </>
        )}
     

   

      <Modal open={isModalOpen} footer={null} onCancel={() => {setIsModalOpen(false)}} closeModal={closeModal}>
        <ModalSeminarInfo seminar={seminar}/>
      </Modal>
    
    </>
  )
}

export default Home