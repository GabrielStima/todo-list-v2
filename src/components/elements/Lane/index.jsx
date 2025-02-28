import {useState, useEffect} from 'react'
import axios from 'axios'
import './styles.css'

export const Lane = ({id, title, deleteLane}) => {
  return (
    <section className='lane'>
        <div className='lane-header'>
            <p>{title}</p>
            <svg onClick={() => deleteLane(id)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>    
        </div>
        <div className='lane-body'>
            
        </div>
        <div className='lane-footer'>
            <button className='add-card'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Add new card
            </button>
        </div>
    </section>
  )
}
