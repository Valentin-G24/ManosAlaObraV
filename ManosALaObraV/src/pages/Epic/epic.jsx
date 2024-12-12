import React, { useState, useEffect } from 'react';
//import styles from './Epic.module.css';
import Header from '../../components/molecules/HeaderBack/headerBack';
import { useParams } from 'react-router-dom';
import CardContainer from '../../components/molecules/CardContainer/CardContainer';
import { get } from '../../utils/ApiRequests';
import InfoDisplay from '../../components/molecules/ProjectInfo/ProjectInfo';
import AddForm from '../../components/molecules/AddForm/addForm';

export default function Epic() {
    const { epicId, n } = useParams(); // Combina los parámetros
    const [stories, setStories] = useState([]);
    const [epic, setEpic] = useState(null); // Cambia a `null` para representar el estado inicial vacío
    const [refreshKey, setRefreshKey] = useState(0); // Renombra para reflejar mejor su propósito

    // Función para refrescar el estado
    const refreshState = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        get(`/epics/${epicId}/stories`, setStories);
        get(`/epics/${epicId}`, setEpic);
    }, [epicId, refreshKey]);

    return (
        <>
        <Header titulo="Épica" />
        
        {/* Renderiza la épica si existe */}
        {epic && (
            <>
            <InfoDisplay element={epic} url="epics" updateState={refreshState} />
            <AddForm type="stories" idEpic={epicId} updateState={refreshState} />
            </>
        )}

        {/* Renderiza las historias si hay elementos */}
        {stories.length > 0 && <CardContainer elements={stories} />}
        </>
    );
}
