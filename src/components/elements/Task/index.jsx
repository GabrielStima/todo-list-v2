import { useState } from 'react'
import axios from 'axios'
import { ChangeableTitle } from '../ChangeableTitle'
import './styles.css'

export const Task = ({id, title, refresh, setCurrentDragTask}) => {
    const [taskTitle, setTaskTitle] = useState(title);

    const handleNameChange = (e) => {
        setTaskTitle(e.target.value);
    }

    const updateTaskName = () => {
        axios.patch(`http://localhost:3001/tasks/${id}`, {
            title: taskTitle
        })
        .then(() => {
            refresh();
        })
    }

  return (
    <div className='task' draggable onDragStart={() => setCurrentDragTask(id)} onDragEnd={() => setCurrentDragTask(null)}>
        <ChangeableTitle handleNameChange={handleNameChange} title={taskTitle} onBlur={updateTaskName}/>
    </div>
  )
}
