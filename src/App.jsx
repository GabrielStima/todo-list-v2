import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Projectbar } from "./components/Projectbar";
import { LaneArea } from "./components/LaneArea";
import { Modal } from "./components/elements/Modal";
import "./assets/css/index.css";

export const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [taskModal, setTaskModal] = useState({});

  const toggleModal = (task) => {
    setModalOpen(!modalOpen);
    task && setTaskModal(task);
  };

  return (
    <div className="app">
      <header>
        <Navbar />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      </header>
      <main className="content">
        <Projectbar />
        <LaneArea
          toggleModal={toggleModal}
          setHasChanged={setHasChanged}
          hasChanged={hasChanged}
          sidebarOpen={sidebarOpen}
        />
        {modalOpen && (
          <Modal
            task={taskModal}
            close={toggleModal}
            setHasChanged={setHasChanged}
          />
        )}
      </main>
    </div>
  );
};
