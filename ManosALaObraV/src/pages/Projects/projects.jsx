import React, { useEffect, useState } from 'react';
import CardContainer from '../../components/molecules/CardContainer/CardContainer';
import { get } from '../../utils/ApiRequests';
import AddForm from '../../components/molecules/AddForm/addForm';

export default function Projects() {
    const [proyectos, setProyectos] = useState(null); // Estado para proyectos, inicializado como null
    const [newState, setNewState] = useState(0); // Estado para forzar la actualización de datos

    // Función para actualizar el estado de la página
    const updateState = () => setNewState((prevState) => prevState + 1);

    // Función para obtener los proyectos desde la API
    const fetchProjects = () => {
        get('/projects', setProyectos);
    };

    // useEffect para cargar los proyectos al montar el componente o cuando cambia `newState`
    useEffect(() => {
        fetchProjects();
    }, [newState]);

    // Función para renderizar la lista de proyectos
    const renderProjects = () => {
        if (proyectos === null) {
        return <p>Cargando proyectos...</p>; // Mensaje mientras cargan los proyectos
        }

        if (proyectos.length === 0) {
        return <p>No hay proyectos disponibles.</p>; // Mensaje cuando no hay proyectos
        }

        return <CardContainer elements={proyectos} />; // Renderiza los proyectos si existen
    };

    return (
        <div>
        <AddForm type="projects" updateState={updateState} /> {/* Formulario para agregar un proyecto */}
        {renderProjects()} {/* Renderiza la lista de proyectos */}
        </div>
    );
}
