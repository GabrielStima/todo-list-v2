import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { ChangeableTitle } from '../ChangeableTitle'
import { Task } from '../Task'
import { DropTaskArea } from '../DropTaskArea'
import './styles.css'

export const Lane = ({id, title, deleteLane, refresh, setCurrentDragLane}) => {
  const [currentDragTask, setCurrentDragTask] = useState(null);
  const [laneTitle, setLaneTitle] = useState(title);
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    getTasks();
  }, [])

  const getTasks = () => {
    axios.get(`http://localhost:3001/tasks?column=${id}`)
    .then((response)=>{
        setTasks(response.data);
    });
  }

  const addTask = (e) => {
    e.preventDefault();
    let position = 0;

    if(tasks.length > 0){
      position = tasks.length;
    }

    axios.post('http://localhost:3001/tasks', {
      id: uuidv4(),
      title: 'New Task',
      description: '',
      column: id,
      position
    }).then(()=>{
        getTasks();
    })
  }

  const handleNameChange = (e) => {
    setLaneTitle(e.target.value);
  }

  const updateLaneName = () => {
    axios.patch(`http://localhost:3001/lanes/${id}`, {
      title: laneTitle
    })
    .then(() => {
      refresh();
    })
  }

  const updateTaskPosition = (id, position) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, {
      position
    }).then(()=>{
      getTasks()
      setTasks([])
    })
  }

  const onDrop = (position) => {
    if(!currentDragTask) return;

    let currentTask = tasks.find((task) => task.id === currentDragTask);
    
    if(position > currentTask.position) {
      let updateTasks = tasks.filter((task) => 
        task.id !== currentDragTask && 
        task.position <= position
      );

      updateTasks.forEach((task, index) => {
        updateTaskPosition(task.id, index - 1);
      });

      updateTaskPosition(currentDragTask, position);
    } else {
      let currentTask = tasks.find((task) => task.id === currentDragTask);
      let updateTask = tasks.filter((task) => 
        task.id !== currentDragTask && 
        task.position <= currentTask.position);

      updateTask.forEach((task, index) => {
        updateTaskPosition(task.id, index + 1);
      });

      updateTaskPosition(currentDragTask, position);
    }
  }

  return (
    <section className='lane'>
        <div className='lane-header'draggable onDragStart={() => setCurrentDragLane(id)} onDragEnd={() => setCurrentDragLane(null)}>
            <ChangeableTitle handleNameChange={handleNameChange} title={laneTitle} onBlur={updateLaneName}/>
            <svg onClick={() => deleteLane(id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>    
        </div>
        <div className='lane-body'>
            <DropTaskArea currentDragTask={currentDragTask} onDrop={onDrop}/>
            {tasks.map((task)=>(
              <React.Fragment key={task.position}>
                <Task id={task.id} title={task.title} refresh={getTasks} setCurrentDragTask={setCurrentDragTask}/>
                <DropTaskArea currentDragTask={currentDragTask} onDrop={onDrop}/>
              </React.Fragment>
            ))}
        </div>
        <div className='lane-footer'>
            <button className='add-card' onClick={addTask}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add new card
            </button>
        </div>
    </section>
  )
}
