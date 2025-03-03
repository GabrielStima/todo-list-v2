import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { ChangeableTitle } from '../ChangeableTitle'
import { Task } from '../Task'
import { DropTaskArea } from '../DropTaskArea'
import './styles.css'

export const Lane = ({
  id,
  title,
  deleteLane,
  refresh,
  setCurrentDragLane,
  currentDragTask, 
  setCurrentDragTask,
  toggleModal,
  setHasChanged
}) => {
  const [laneTitle, setLaneTitle] = useState(title);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios.get(`http://localhost:3001/tasks?column=${id}`).then((response) => {
      sortingTask(response.data);
    });
  };

  const sortingTask = (array = tasks) => {
    let temp = [...array];
    temp.sort((a, b) => a.position - b.position);
    setTasks(temp)
}

  const addTask = (e) => {
    e.preventDefault();
    let position = 0;

    if (tasks.length > 0) {
      position = tasks.length;
    }

    axios
      .post("http://localhost:3001/tasks", {
        id: uuidv4(),
        title: "New Task",
        description: "",
        column: id,
        position,
      })
      .then(() => {
        getTasks();
      });
  };

  const handleNameChange = (e) => {
    setLaneTitle(e.target.value);
  };

  const updateLaneName = () => {
    axios
      .patch(`http://localhost:3001/lanes/${id}`, {
        title: laneTitle,
      })
      .then(() => {
        refresh();
      });
  };

  const updateTaskPosition = (id, position) => {
    axios
      .patch(`http://localhost:3001/tasks/${id}`, {
        position,
      })
      .then(() => {
        getTasks();
      });
  };

  const updateTaskColumn = async (id, column) => {
    const updatedTask = await axios
      .patch(`http://localhost:3001/tasks/${id}`, {
        column,
      })

      return updatedTask.data;
  };

  const onDropSameColumn = (position, currentTask) => {
    if (position > currentTask.position) {
      let updateTasks = tasks.filter(
        (task) => task.id !== currentDragTask && task.position <= position
      );

      updateTasks.forEach((task) => {
        updateTaskPosition(task.id, task.position - 1);
      });

      updateTaskPosition(currentDragTask, position);
    } else {
      let updateTask = tasks.filter(
        (task) =>
          task.id !== currentDragTask &&
          task.position <= currentTask.position &&
          task.position >= position
      );

      updateTask.forEach((task) => {
        updateTaskPosition(task.id, task.position + 1);
      });

      updateTaskPosition(currentDragTask, position);
    }

  };

  const onDropDifferentColumn = async (id, position, columnId) => {
      const currentTask = await updateTaskColumn(id, columnId);
      onDropSameColumn(position, currentTask);
      setHasChanged(true);
      refresh();
  };

  const onDrop = (position, columnId) => {
    let currentTask = tasks.find((task) => task.id === currentDragTask);
    currentTask ? onDropSameColumn(position, currentTask) : onDropDifferentColumn(currentDragTask ,position, columnId);
  };

  return (
    <section className="lane">
      <div
        className="lane-header"
        draggable
        onDragStart={() => setCurrentDragLane(id)}
        onDragEnd={() => setCurrentDragLane(null)}
      >
        <ChangeableTitle
          handleNameChange={handleNameChange}
          title={laneTitle}
          onBlur={updateLaneName}
        />
        <svg
          onClick={() => deleteLane(id)}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="lane-body">
        {!tasks.length && <DropTaskArea onDrop={() => onDrop(0, id)}/>}
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <DropTaskArea onDrop={() => onDrop(task.position, id)}>
              <Task
                id={task.id}
                title={task.title}
                description={task.description}
                refresh={getTasks}
                setCurrentDragTask={setCurrentDragTask}
                toggleModal={toggleModal}
              />
            </DropTaskArea>
          </React.Fragment>
        ))}
      </div>
      <div className="lane-footer">
        <button className="add-card" onClick={addTask}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add new card
        </button>
      </div>
    </section>
  );
};
