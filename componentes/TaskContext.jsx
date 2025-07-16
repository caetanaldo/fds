import { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [localTasks, setLocalTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme  === 'light' ? 'dark' : 'light');
  }

  const getCompletedCount = () => localTasks.filter((task) => task.completed).length;

  const addTask = ({ title, description, id }) => {
    setLocalTasks((prev) => [
      ...prev,
      {
        id: id || `local-${Date.now()}`,
        title,
        description: description || '',
        completed: false,
      },
    ]);
  };

  const toggleTaskCompletion = (id) => {
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setLocalTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearTasks = () => {
    setLocalTasks([]);
  };

  return (
    <TaskContext.Provider value={{ localTasks, addTask, toggleTaskCompletion, deleteTask, theme, toggleTheme, getCompletedCount, clearTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
