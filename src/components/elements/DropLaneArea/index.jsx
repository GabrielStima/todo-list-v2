import { useState } from 'react'
import './styles.css'

export const DropLaneArea = ({onDrop, currentDragLane}) => {
  const [showDropArea, setShowDropArea] = useState(false)

  return (
    <section className={showDropArea ? "drop-area" : "hide-drop-area"}
      onDragEnter={() => currentDragLane && setShowDropArea(true)}
      onDragLeave={() => setShowDropArea(false)}
      onDrop={() => {
        if (currentDragLane) {
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
