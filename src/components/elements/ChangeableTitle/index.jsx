import { useState } from 'react'

export const ChangeableTitle = ({className, onBlur = ()=>{}, onClick = ()=>{}, handleNameChange, title}) => {
  const [changeNameProcess, setChangeNameProcess] = useState(false);

  return (
    <div className={className} onBlur={() => {onBlur();  setChangeNameProcess(false)}}>
        {
        changeNameProcess ? (
            <input onChange={handleNameChange} autoFocus/>
        ) : (
            <h2 onClick={() => {onClick(); setChangeNameProcess(true)}}>{title}</h2>
        )
        }
    </div>
  )
}
