import React, { useState } from 'react'
import './styles.css'

export const DropTaskArea = ({onDrop, children}) => {
    const [showDropArea, setShowDropArea] = useState(false)

    return (
      <section className={`${showDropArea ? "drop-task-area" : "hide-drop-task-area"} ${!children && "drop-here"}`}        
        onDragEnter={() => setShowDropArea(true)}
        onDragLeave={() => setShowDropArea(false)}
        onDrop={() => {
          onDrop();
          setShowDropArea(false);
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        {children ? children : 'Drop Here'}
      </section>
    )
  }
