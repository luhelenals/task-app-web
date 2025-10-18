import './App.css';
import { TaskWrapper } from './components/taskWrapper';
import { Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/loginForm';
import { TaskForm } from './components/taskForm';
import { RegisterForm } from './components/registerForm';
import { Tasks } from './components/tasks';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/tasks/create" element={<TaskForm />} />
      <Route path="*" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/tasks" element={<Tasks/>} />
    </Routes>
  );
}

export default App;
