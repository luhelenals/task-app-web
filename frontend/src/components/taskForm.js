import React, {useState} from 'react';

export const TaskForm = () => {
    const [task, setTask] = useState({
        titulo: '',
        descricao: '',
        data_conclusao: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
             const payload = {
                ...task,
                data_conclusao: task.data_conclusao
                    ? new Date(task.data_conclusao).toISOString()
                    : null
            };

            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:4000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Erro ${res.status}: ${text}`);
            }

            const data = await res.json();
            console.log('Tarefa salva:', data);

            // limpa o formulário
            setTask({ titulo: '', descricao: '', data_conclusao: '' });
        } catch (err) {
            console.error('Falha ao salvar tarefa:', err);
            setError(err.message || 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className='TaskForm' onSubmit={handleSubmit}>
            <h2>Nova Tarefa</h2>

            <input
                name='titulo'
                type='text'
                className='task-input'
                placeholder='Título'
                value={task.titulo}
                onChange={handleChange}
            />

            <input
                name='descricao'
                type='text'
                className='task-input'
                placeholder='Descrição'
                value={task.descricao}
                onChange={handleChange}
            />

            <input
                name='data_conclusao'
                type='date'
                className='task-input'
                value={task.data_conclusao}
                onChange={handleChange}
            />

            <button type='submit' className='task-button' disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </button>

            {error && <div style={{color:'#ffb0cf', marginTop:8}}>{error}</div>}
        </form>
    );
} 