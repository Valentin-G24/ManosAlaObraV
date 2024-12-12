import React, { useEffect, useState } from 'react';
import styles from './StoriesGral.module.css';
import Card from '../../components/molecules/Card/card';

export default function StoriesGral() {
    const [stories, setStories] = useState([]); // Estado para almacenar las historias
    const [loading, setLoading] = useState(true); // Estado para indicar si los datos están siendo cargados
    const [error, setError] = useState(null); // Estado para manejar errores

    // Fetch para obtener las historias de la API
    useEffect(() => {
        fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('token'),
        },
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error('Error al cargar las historias');
            }
            return response.json();
        })
        .then((data) => {
            setStories(data.data);
            setLoading(false); 
        })
        .catch((error) => {
            setError(error.message); // Si hay un error, lo almacenamos en el estado
            setLoading(false); // Finalizamos la carga
        });
    }, []); 

    // Función para renderizar el contenido dependiendo del estado
    const renderContent = () => {
        if (loading) {
        return <p>Cargando historias...</p>; 
        }

        if (error) {
        return <p>Error: {error}</p>; 
        }

        if (stories.length === 0) {
        return <p>No hay historias de usuario disponibles.</p>; 
        }

        // Renderizamos las historias si hay datos
        return stories.map((story) => <Card key={story._id} content={story.name} />);
    };

    return (
        <div>
        <h3>Historias de usuario:</h3>
        <div id={styles.PrinDivProject}>
            <div id={styles.cardContainer}>
            {renderContent()} {}
            </div>
        </div>
        </div>
    );
}
