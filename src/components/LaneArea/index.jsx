import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import {Lane} from '../elements/Lane'
import {DropLaneArea} from '../elements/DropLaneArea'
import './styles.css'

export const LaneArea = ({toggleModal, setHasChanged, hasChanged, sidebarOpen}) => { 
  const [lanes, setLanes] = useState([]);
  const [currentDragLane, setCurrentDragLane] = useState(null);
  const [currentDragTask, setCurrentDragTask] = useState(null);

  useEffect(()=>{
    getLanes();
  }, [])

  useEffect(() => {
    setLanes([])
    getLanes()
    setHasChanged(false)
  }, [hasChanged])

  const addLane = (e) => {
    e.preventDefault();
    let position = 0;

    if(lanes.length > 0){
      position = lanes.length;
    }

    axios.post('http://localhost:3001/lanes', {
      id: uuidv4(),
      title: 'New Lane',
      position
    }).then(()=>{
      getLanes();
    })
  }

  const getLanes = () => {
    axios.get('http://localhost:3001/lanes')
    .then((response)=>{
      sortingLanes(response.data);
    });
  }

  const deleteLane = (id) => {
    axios.delete(`http://localhost:3001/lanes/${id}`)
    .then(()=>{
      getLanes();
    })
  }

  const sortingLanes = (array = lanes) => {
      let temp = [...array];
      temp.sort((a, b) => a.position - b.position);
      setLanes(temp)
  }

  const updateLanePosition = (id, position) => {
    axios.patch(`http://localhost:3001/lanes/${id}`, {
      position
    }).then(()=>{
      getLanes()
    })
  }

  const onDrop = (position) => {
    if(!currentDragLane) return;

    let currentLane = lanes.find((lane) => lane.id === currentDragLane);

    if(position > currentLane.position) {
      let updateLanes = lanes.filter((lane) => 
        lane.id !== currentDragLane && 
        lane.position >= currentLane.position &&
        lane.position <= position
      );
      console.log('IF', updateLanes)
      updateLanes.forEach((lane) => {
        updateLanePosition(lane.id, lane.position - 1);
      });

      updateLanePosition(currentDragLane, position);
    } else {
      console.log('ELSE')
      let updateLanes = lanes.filter((lane) => 
        lane.id !== currentDragLane && 
        lane.position <= currentLane.position &&
        lane.position >= position);

      updateLanes.forEach((lane) => {
        updateLanePosition(lane.id, lane.position + 1);
      });

      updateLanePosition(currentDragLane, position);
    }
  }

  return (
    <div className={`lane-area ${!sidebarOpen ? 'sidebar-close' : ''}`}>
      <DropLaneArea
        currentDragLane={currentDragLane}
        onDrop={() => onDrop(0)}
      />
      {lanes.map((lane) => (
        <React.Fragment key={lane.id}>
          <Lane
            id={lane.id}
            title={lane.title}
            deleteLane={deleteLane}
            refresh={getLanes}
            setCurrentDragLane={setCurrentDragLane}
            currentDragTask={currentDragTask}
            setCurrentDragTask={setCurrentDragTask}
            toggleModal={toggleModal}
            setHasChanged={setHasChanged}
          />
          <DropLaneArea
            currentDragLane={currentDragLane}
            onDrop={() => onDrop(lane.position)}
          />
        </React.Fragment>
      ))}
      <button className="add-lane" onClick={addLane}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 12H19"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Add new list
      </button>
    </div>
  );
}
