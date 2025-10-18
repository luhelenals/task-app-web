import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API = 'http://localhost:4000/tasks';

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(API, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const statuses = [
    { key: 'PENDENTE', label: 'Pendente' },
    { key: 'EM_ANDAMENTO', label: 'Em andamento' },
    { key: 'CONCLUIDA', label: 'Concluída' },
  ];

  // Drag handlers
  const onDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', String(id));
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = async (e, newStatus) => {
    e.preventDefault();
    const idStr = e.dataTransfer.getData('text/plain');
    if (!idStr) return;
    const id = Number(idStr);
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === newStatus) return;

    // Optimistic UI update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t)));

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // send full object with updated status so backend can validate/keep other fields
        body: JSON.stringify({ ...task, status: newStatus }),
      });
      if (!res.ok) {
        throw new Error(`Erro ${res.status}`);
      }
      const updated = await res.json();
      // reconcile with server response
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error('Failed to update status:', err);
      // rollback on error
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: task.status } : t)));
      alert('Não foi possível atualizar o status da tarefa.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Excluir esta tarefa?')) return;
    // optimistic remove
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error(`Erro ${res.status}`);
    } catch (err) {
      console.error('Delete failed:', err);
      setTasks(previous); // rollback
      alert('Não foi possível excluir a tarefa.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  return (
    <div className="task-wrapper">
      <h2>Minhas tarefas</h2>
      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="kanban">
          {statuses.map((s) => (
            <div
              key={s.key}
              className="kanban-column"
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, s.key)}
            >
              <div className="kanban-column-header">{s.label}</div>
              <div className="kanban-column-body">
                {tasks.filter((t) => t.status === s.key).length === 0 && (
                  <div className="column-empty">Nenhuma tarefa</div>
                )}
                {tasks
                  .filter((t) => t.status === s.key)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="task-card"
                      draggable
                      onDragStart={(e) => onDragStart(e, task.id)}
                    >
                      <div className="task-card-main">
                        <div className="task-card-title">{task.titulo}</div>
                        <div className="task-card-desc">{task.descricao}</div>
                        {task.data_conclusao && (
                          <div className="task-card-date">
                            Prazo: {new Date(task.data_conclusao).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      <div className="task-actions">
                        <button
                          className="task-action-edit"
                          onClick={() => handleEdit(task.id)}
                          aria-label="Editar"
                        >
                          ✎
                        </button>
                        <button
                          className="task-action-delete"
                          onClick={() => handleDelete(task.id)}
                          aria-label="Excluir"
                        >
                          ✖
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>        
      )}

      <button
        type="button"
        className='task-button'
        onClick={() => navigate('/tasks/create')}
      >
        Criar tarefa
      </button>
    </div>
  );
};