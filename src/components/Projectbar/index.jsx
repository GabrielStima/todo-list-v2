import { useState } from 'react'
import { ChangeableTitle } from '../elements/ChangeableTitle'
import './styles.css'

export const Projectbar = () => {
  const [projectName, setProjectName] = useState('Lorem  Ipsun');

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  }

  return (
    <ChangeableTitle className="projectbar" handleNameChange={handleNameChange} title={projectName}/>
  )
}
