import { useState } from 'react'
import './styles.css'

export const Projectbar = () => {
  const [projectName, setProjectName] = useState('Lorem  Ipsun');
  const [changeNameProcess, setChangeNameProcess] = useState(false);

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  }

  return (
    <div className="projectbar" onBlur={() => setChangeNameProcess(false)}>
      {
        changeNameProcess ? (
          <input onChange={handleNameChange} autoFocus/>
        ) : (
          <h2 onDoubleClick={() => setChangeNameProcess(true)}>{projectName}</h2>
        )
      }

    </div>
  )
}
