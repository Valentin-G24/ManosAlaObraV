import React, { useState } from 'react';
import { FaPencilAlt } from "react-icons/fa";
import styles from './Edit.module.css';
import { patch } from '../../../utils/ApiRequests';

export default function Edit({ url, updateState }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState('');

    const editTask = (e) => {
        e.preventDefault(); 

        if (name.trim() !== '' || description.trim() !== '') {
            const body = { name, description };
        
            patch(url, body).then((data) => {
                if (data.status !== 'fail') {
                    setShowForm(false);
                    setName('');
                    setDescription('');
                    updateState();
                } else {
                    setError('Hubo un problema al actualizar');
                }
            }).catch(() => setError('Error al conectar con el servidor'));
        } else {
            setError('Por favor, ingresa al menos un cambio.');
        }
    };

    return (
        <>
            <button className={styles.editButon} onClick={() => setShowForm(!showForm)}>
                <FaPencilAlt style={{ fontSize: '1.5rem' }} />
            </button>
            {showForm && (
                <div id={styles.formContainer}>
                    <h2>Editar</h2>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <form onSubmit={editTask} id={styles.form}>
                        <input
                            type="text"
                            placeholder='Nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Descripción'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button type="submit" disabled={!name && !description}>Editar</button>
                    </form>
                </div>
            )}
        </>
    );
}
