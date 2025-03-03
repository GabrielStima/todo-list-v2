import { useState } from "react";
import axios from "axios";
import { ChangeableTitle } from "../ChangeableTitle";
import "./styles.css";

export const Task = ({
  id,
  title,
  description,
  refresh,
  setCurrentDragTask,
  toggleModal,
}) => {
  const [taskTitle, setTaskTitle] = useState(title);

  const handleNameChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const updateTaskName = () => {
    axios
      .patch(`http://localhost:3001/tasks/${id}`, {
        title: taskTitle,
      })
      .then(() => {
        refresh();
      });
  };

  return (
    <div
      className="task"
      onDoubleClick={() => toggleModal({ id, title, description })}
      draggable
      onDragStart={() => setCurrentDragTask(id)}
      onDragEnd={() => setCurrentDragTask(null)}
    >
      <ChangeableTitle
        handleNameChange={handleNameChange}
        title={taskTitle}
        onBlur={updateTaskName}
      />
      {description && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 10H3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 6H3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 14H3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 18H3"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};
