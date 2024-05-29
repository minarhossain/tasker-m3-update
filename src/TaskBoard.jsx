import { useState } from "react";
import SearchTask from "./tasks/SearchTask";
import TaskAction from "./tasks/TaskAction";
import TaskList from "./tasks/TaskList";
import AddTaskModal from "./tasks/AddTaskModal";
import NoTaskFound from "./tasks/NoTaskFound";
const defaultTask = {
  id: crypto.randomUUID(),
  title: "Web Development",
  description:
    "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently. ",
  tags: ["web", "python", "API", "Next"],
  priority: "High",
  isFavorite: true,
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return { ...newTask };
          } else {
            return task;
          }
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleDeleteTask = (taskId) => {
    // const filteredTasks = tasks.filter(task => task.id === taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleDeleteAllTask = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    const newTask = [...tasks];

    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;
    setTasks(newTask);
  };

  const handleSearch = (text) => {
    const filtered = tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setTasks([...filtered]);
  };
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onClose={handleCloseModal}
          taskToUpdate={taskToUpdate}
        />
      )}
      <div className="container mx-auto">
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddTask={() => setShowAddModal(true)}
            onAllDelete={handleDeleteAllTask}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
