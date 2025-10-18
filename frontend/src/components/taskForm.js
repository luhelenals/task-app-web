import React, {useState} from 'react';

export const TaskForm = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(task);
        
        setTask({ title: '', description: '', dueDate: '' });
    }

    return (
        <form className='TaskForm' onSubmit={handleSubmit}>
            <h2>Nova Tarefa</h2>

            <input
                name='title'
                type='text'
                className='task-input'
                placeholder='Título'
                value={task.title}
                onChange={handleChange}
            />

            <input
                name='description'
                type='text'
                className='task-input'
                placeholder='Descrição'
                value={task.description}
                onChange={handleChange}
            />

            <input
                name='dueDate'
                type='date'
                className='task-input'
                value={task.dueDate}
                onChange={handleChange}
            />

            <button type='submit' className='task-button'>Salvar</button>
        </form>
    );
} 