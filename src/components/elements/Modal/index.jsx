import { useState, useEffect } from 'react'
import axios from 'axios';
import './styles.css'

export const Modal = ({task, close, setHasChanged}) => { 
    const [description, setDescription] = useState('');

    useEffect(() => {
        task.description && setDescription(task.description);
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.patch(`http://localhost:3001/tasks/${task.id}`, {
            description: description
        },{headers: {'Content-Type': 'application/json'}}).then(() => {
            close();
            setHasChanged(true)
        })
        
    }

    const deleteTask = (e) => {
        e.preventDefault();

        axios.delete(`http://localhost:3001/tasks/${task.id}`).then(() => {
            close();
            setHasChanged(true)
        })
    }

  return (
    <div className='modal-container'>
        <div className='modal'>
            <div className='modal-header'>
                <h3>{task.title}</h3>
                <svg onClick={() => close()} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.25 8.75L8.75 26.25" stroke="#50595C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.75 8.75L26.25 26.25" stroke="#50595C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className='modal-body'>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="description">DESCRIPTION<span>(OPICIONAL)</span></label>
                        <textarea placeholder='Enter a description' name="description" id="description" cols="30" rows="10" value={description} onInput={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className='form-group modal-footer'>
                        <button type='button' onClick={(e) => deleteTask(e)} className='delete'>DELETE</button>
                        <button type='submit'>UPDATE</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
