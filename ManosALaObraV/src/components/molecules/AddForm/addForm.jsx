    import React, { useState } from 'react';
    import styles from './AddForm.module.css';
    import { post } from '../../../utils/ApiRequests';
    import { bodySet } from '../../../utils/bodySetter';

    export default function AddForm({ type, updateState, idProject, idEpic }) {
    const [showForm, setShowForm] = useState(false);  // Estado para mostrar/ocultar el formulario
    const [showError, setShowError] = useState(false); // Estado para mostrar el error
    const [errMessage, setErrMessage] = useState(''); // Mensaje de error
    const [name, setName] = useState(''); // Nombre del nuevo proyecto/épica
    const [description, setDescription] = useState(''); // Descripción del nuevo proyecto/épica
    const [loading, setLoading] = useState(false); // Estado para manejar la carga
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

    // Función para manejar el envío del formulario
    const add = (e) => {
        e.preventDefault();

        // Validación de los campos
        if (!name || !description) {
        setShowError(true);
        setErrMessage('Todos los campos son obligatorios.');
        return;
        }

        const bodySend = bodySet(type, name, description, idProject, idEpic); // Crea el cuerpo de la solicitud
        console.log(bodySend); // Muestra el cuerpo en la consola para depuración

        setLoading(true); // Activa el estado de carga

        post(`/${type}`, bodySend) // Realiza la solicitud POST
        .then((data) => {
            setLoading(false); // Desactiva el estado de carga

            if (data.status !== 'fail' && data.status !== 'error') {
            console.log(data); // Muestra la respuesta de la API en la consola
            updateState(); // Actualiza el estado en el componente padre
            setShowForm(false); // Cierra el formulario
            setShowError(false); // Resetea el error
            setSuccessMessage('Se ha agregado correctamente el nuevo ' + type); // Mensaje de éxito
            setName(''); // Resetea los valores del formulario
            setDescription('');
            } else {
            setShowError(true); // Muestra el mensaje de error
            setSuccessMessage(''); // Resetea el mensaje de éxito
            if (type === 'projects') {
                setErrMessage(data.data.name); // Error específico para proyectos
            }
            if (type === 'epics') {
                setErrMessage(data.message.message); // Error específico para épicas
            }
            }
        })
        .catch((error) => {
            setLoading(false); // Desactiva el estado de carga
            setShowError(true); // Muestra el mensaje de error
            setErrMessage('Hubo un problema con la conexión. Intente nuevamente.');
            setSuccessMessage(''); // Resetea el mensaje de éxito
        });
    };

    return (
        <div id={styles.PrinDivProject}>
        <div id={styles.add}>
            <button onClick={() => setShowForm(!showForm)}>ADD {type}</button>
        </div>

        {showForm && (
            <div id={styles.formContainer}>
            <h2>{type}</h2>
            <form action="" id={styles.form} onSubmit={(e) => add(e)}>
                {showError && <h3 className={styles.error}>Error: {errMessage}</h3>} {/* Muestra el error si ocurre */}
                {successMessage && <h3 className={styles.success}>{successMessage}</h3>} {/* Muestra el mensaje de éxito */}

                <input
                type="text"
                className={styles.input}
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                />
                <input
                type="text"
                className={styles.input}
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                />

                <button type="submit" disabled={loading}>ADD</button> {/* Deshabilita el botón durante la carga */}
            </form>

            {loading && <p className={styles.loading}>Cargando...</p>} {/* Muestra un indicador de carga */}
            </div>
        )}
        </div>
    );
    }
