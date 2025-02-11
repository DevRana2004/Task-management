// components/TaskItem.js
import { useState } from 'react';

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
  const toggleCompletion = async () => {
    try {
      const res = await fetch(`/api/tasks?id=${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !task.isCompleted })
      });
      const data = await res.json();
      if (data.success) {
        onTaskUpdated(data.data);
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  const deleteTask = async () => {
    try {
      const res = await fetch(`/api/tasks?id=${task._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        onTaskDeleted(task._id);
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="border p-6 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition duration-300">
      <div>
        <h2 className="text-xl font-semibold text-blue-600">{task.title}</h2>
        <p className="text-gray-700">{task.description}</p>
        <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className={`text-sm ${task.isCompleted ? 'text-green-600' : 'text-red-600'}`}>
          Status: {task.isCompleted ? 'Complete' : 'Incomplete'}
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-3">
        <button
          onClick={toggleCompletion}
          className={`px-4 py-2 rounded-md text-white font-semibold focus:outline-none 
          ${task.isCompleted ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          onClick={deleteTask}
          className="px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
