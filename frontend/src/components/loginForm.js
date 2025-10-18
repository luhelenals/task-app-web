import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:4000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Erro ${res.status}`);
      }

      const data = await res.json();

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }
      navigate('/tasks/create');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Entrar</h2>

      <label>
        Email
        <input
          name="email"
          type="email"
          className="task-input"
          placeholder="seu@email.com"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Senha
        <input
          name="password"
          type="password"
          className="task-input"
          placeholder="Senha"
          value={form.password}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit" className="task-button" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>

      <button
        type="button"
        className="login-register-button"
        onClick={() => navigate('/register')}
        aria-label="Criar conta"
      >
        Ainda não tem uma conta? Cadastre-se
      </button>

      {error && <div style={{ color: 'var(--accent)', marginTop: 8 }}>{error}</div>}
    </form>
  );
};