import React, { useState } from 'react'
import './styles.css'

export const DropTaskArea = ({onDrop, currentDragTask}) => {
    const [showDropArea, setShowDropArea] = useState(false)

    return (
      <section className={showDropArea ? "drop-task-area" : "hide-drop-task-area"}        
        onDragEnter={() => currentDragTask && setShowDropArea(true)}
        onDragLeave={() => setShowDropArea(false)}
        onDrop={() => {
          if (currentDragTask) {
            onDrop();
            setShowDropArea(false);
          }
        }}
        onDragOver={(event) => event.preventDefault()}
      >
        Drop Here
      </section>
    )
  }
