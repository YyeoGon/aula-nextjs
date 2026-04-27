'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Atividade05() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aprender React' },
    { id: 2, text: 'Praticar gerenciamento de estado' },
  ]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedText = taskText.trim();
    if (!trimmedText) return;

    if (editId) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editId ? { ...task, text: trimmedText } : task
        )
      );
      setEditId(null);
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), text: trimmedText },
      ]);
    }

    setTaskText('');
  };

  const handleEdit = (task) => {
    setTaskText(task.text);
    setEditId(task.id);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    if (editId === id) {
      setEditId(null);
      setTaskText('');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Atividade 5 - Lista de tarefas</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={taskText}
          onChange={(event) => setTaskText(event.target.value)}
          placeholder="Nova tarefa..."
        />
        <button className={styles.addBtn} type="submit">
          {editId ? 'Atualizar tarefa' : 'Adicionar tarefa'}
        </button>
      </form>

      <div className={styles.list}>
        {tasks.length === 0 ? (
          <p>Não há tarefas cadastradas.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className={styles.item}>
              <span>{task.text}</span>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => handleEdit(task)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleDelete(task.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
