import React, { useState } from 'react';
import styles from './Stories.module.css';
import Edit from '../Edit/edit';
import DeleteButton from '../DeleteButton/deleteButton';

export default function Stories({ tasks, updateState }) {
    const [error, setError] = useState(null); // Estado para manejar errores

    const toggleTaskState = (task) => {
        fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/tasks/${task._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                auth: localStorage.getItem('token'),
            },
            body: JSON.stringify({
                ...task,
                done: !task.done, // Alternar el estado "done"
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al cambiar el estado de la tarea.');
                }
                return response.json();
            })
            .then(() => {
                updateState(); // Actualizar lista de tareas
            })
            .catch((err) => {
                console.error(err);
                setError('Hubo un problema al actualizar la tarea.');
            });
    };

    return (
        <>
            {error && (
                <div className={styles.error}>
                    <p>{error}</p>
                    <button onClick={() => setError(null)}>Cerrar</button>
                </div>
            )}
            <div id={styles.cardContainer}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        toggleTaskState={toggleTaskState}
                        updateState={updateState}
                    />
                ))}
            </div>
        </>
    );
}

function TaskCard({ task, toggleTaskState, updateState }) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <div className={styles.story}>
            <div className={styles.inputAndName}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={task.done}
                    onChange={() => toggleTaskState(task)}
                />
                <span className={styles.taskName}>{task.name}</span>
                <Edit url={`/tasks/${task._id}`} updateState={updateState} />
                <DeleteButton url={`/tasks/${task._id}`} updateState={updateState} type="task" />
            </div>
            {task.description && (
                <>
                    <div className={styles.divisor}></div>
                    <div
                        className={styles.descriptionContainer}
                        onClick={() => setShowFullDescription(!showFullDescription)}
                    >
                        <p>
                            {showFullDescription
                                ? task.description
                                : `${task.description.slice(0, 50)}...`}
                        </p>
                        <button className={styles.expandButton}>
                            {showFullDescription ? 'Ver menos' : 'Ver más'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
