import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [localTasks, setLocalTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  const clearTasks = async () => {
    try {
      await AsyncStorage.removeItem('@TaskApp:tasks');
      setLocalTasks([]);
    } catch (err) {
      console.error('Erro ao limpar as tarefas:', err);
    }
  }

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

  useEffect (() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('@TaskApp:tasks');
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          if (Array.isArray(parsedTasks) && parsedTasks.every(task => task.id && task.title)) {
            setLocalTasks(parsedTasks);
          }
          else {
            console.warn('Dados inválidos, inicializando com array vazio')
            setLocalTasks([]);
          }
        }
      } catch (err) {
        console.error('Erro ao carregar as tarefas:', err);
      }
    }

    loadTasks();
  } , [])

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('@TaskApp:tasks', JSON.stringify(localTasks));
      } catch (err) {
        console.error('Erro ao salvar as tarefas:', err);
      }
    }

    saveTasks();
  } , [localTasks])

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
