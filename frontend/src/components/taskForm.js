import React from 'react';

export const TaskForm = () => {
    return (
        <form className='TaskForm'>
            <h2>Nova Tarefa</h2>
            <input type='text' className='task-input' 
            placeholder='Título'/>

            <input type='text' className='task-input' 
            placeholder='Descrição'/>

            <input type='date' className='task-input'/>

            <button type='submit' className='task-button'>Salvar</button>
        </form>
    );
} 