import React, { useState } from 'react'
import './styles.css'

export const DropTaskArea = ({onDrop}) => {
    const [showDropArea, setShowDropArea] = useState(false)

    return (
      <section className={showDropArea ? "drop-task-area" : "hide-drop-task-area"}        
        onDragEnter={() => setShowDropArea(true)}
        onDragLeave={() => setShowDropArea(false)}
        onDrop={() => {
          onDrop();
          setShowDropArea(false);
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        Drop Here
      </section>
    )
  }
