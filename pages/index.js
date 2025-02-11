// pages/index.js
import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task._id === updatedTask._id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Task Management App
        </h1>

        {/* Task Form Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <TaskForm onTaskAdded={handleTaskAdded} />
        </div>

        {/* Task List Section */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          {loading ? (
            <p className="text-center text-gray-500">Loading tasks...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          )}
        </div>
      </div>
    </div>
  );
}
