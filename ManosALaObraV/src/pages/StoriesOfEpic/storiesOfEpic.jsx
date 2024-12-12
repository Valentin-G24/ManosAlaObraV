import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/molecules/HeaderBack/headerBack';
//import styles from './StoriesOfEpic.module.css';
import Stories from '../../components/molecules/Stories/stories';
import { get, post } from '../../utils/ApiRequests';

export default function StoriesOfEpic() {
    const { m, j } = useParams(); // Destructuración para obtener los parámetros de la URL

    const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
    const [showError, setShowError] = useState(false); // Estado para mostrar errores
    const [errMessage, setErrMessage] = useState(''); // Estado para el mensaje de error

    const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas
    const [loading, setLoading] = useState(true); // Estado de carga
    const [newState, setNewState] = useState(0); // Estado para actualizar el componente al agregar tareas

    const [name, setName] = useState(''); // Estado para el nombre de la tarea
    const [description, setDescription] = useState(''); // Estado para la descripción
    const [due, setDue] = useState(''); // Estado para la fecha límite

    const updateState = () => setNewState(prevState => prevState + 1); // Función para actualizar el estado de nuevas tareas

    // Función para agregar una nueva tarea
    const addTask = (e) => {
        e.preventDefault();
        const bodySend = {
        done: false,
        name,
        description,
        story: j,
        created: new Date().toISOString(), // Fecha de creación dinámica
        due,
        };

        post(`/tasks`, bodySend)
        .then((data) => {
            if (data.status !== 'error') {
            setNewState(prevState => prevState + 1);
            setShowForm(false);
            setShowError(false);
            } else {
            setShowError(true);
            setErrMessage(data.message.message);
            }
        })
        .catch((error) => {
            setShowError(true);
            setErrMessage('Error al agregar la tarea. Intenta nuevamente.');
        });
    };

    // Obtener las tareas al montar el componente
    useEffect(() => {
        setLoading(true); // Indicamos que se está cargando
        get(`/stories/${j}/tasks`, setTasks)
        .then(() => setLoading(false)) // Finalizamos la carga cuando los datos están listos
        .catch(() => {
            setLoading(false);
            setShowError(true);
            setErrMessage('Error al cargar las tareas.');
        });
    }, [j, newState]); // Ejecuta cada vez que `j` o `newState` cambian

    return (
        <>
        <Header titulo="Historias de usuario" />
        <div id={styles.PrinDivProject}>
            {/* Botón para mostrar el formulario de agregar tarea */}
            <div id={styles.addTask}>
            <button onClick={() => setShowForm(!showForm)}>ADD TASK</button>
            </div>

            {/* Formulario para agregar tarea */}
            {showForm && (
            <div id={styles.formContainer}>
                <h2>TASK</h2>
                <form onSubmit={addTask} id={styles.form}>
                {showError && <h3>Error: {errMessage}</h3>}
                <input
                    type="text"
                    required
                    className={styles.input}
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Descripcion"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Fecha limite (YYYY-MM-DD)"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                />
                <button type="submit">ADD</button>
                </form>
            </div>
            )}

            {/* Condicional para mostrar las tareas */}
            {loading ? (
            <p>Cargando...</p>
            ) : tasks.length === 0 ? (
            <p>No hay tareas</p>
            ) : (
            <Stories tasks={tasks} updateState={updateState} />
            )}
        </div>
        </>
    );
}
