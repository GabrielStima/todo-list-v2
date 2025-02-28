import {useState, useEffect} from 'react'
import axios from 'axios'
import {Lane} from '../elements/Lane'
import './styles.css'

export const LaneArea = () => { 
  const [lanes, setLanes] = useState([]);

  useEffect(()=>{
    getLanes();
  }, [])

  const addLane = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/lanes', {
      id: `${lanes.length + 1}`,
      title: 'New Lane'
    }).then(()=>{
      getLanes();
    })
  }

  const getLanes = () => {
    axios.get('http://localhost:3001/lanes')
    .then((response)=>{
      setLanes(response.data)
    });
  }

  const deleteLane = (id) => {
    axios.delete(`http://localhost:3001/lanes/${id}`)
    .then(()=>{
      getLanes();
    })
  }

  return (
    <div className='lane-area'>
      {lanes.map((lane, index)=> (
        <Lane key={index} id={lane.id} title={lane.title} deleteLane={deleteLane}/>
      ))}
      <button className='add-lane' onClick={addLane}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Add new list
      </button>
    </div>
  )
}
