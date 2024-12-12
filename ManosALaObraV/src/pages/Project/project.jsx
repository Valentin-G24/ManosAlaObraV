    import React, { useState,useEffect } from 'react'
    import styles from './Project.module.css'
    import { useParams } from 'react-router-dom'
    import Header from '../../components/molecules/HeaderBack/headerBack'
    import CardContainer from '../../components/molecules/CardContainer/CardContainer'
    import { get } from '../../utils/ApiRequests'
    import InfoDisplay from '../../components/molecules/ProjectInfo/ProjectInfo'
    import AddForm from '../../components/molecules/AddForm/addForm'

    export default function Project() {

    const { projectId } = useParams();
    const [epics,setEpics] = useState(undefined); 
    const [project, setProject] = useState([]);

    const [newState, setNewState] = useState(0);

    const updateState = () => {
        setNewState(newState+1);
    }

    project.description;

    useEffect(()=>{
        get(`/projects/${projectId}/epics`, setEpics);      
        get(`/projects/${projectId}`, setProject)
    },[projectId, newState]);

    return (
        <>
        <Header titulo={"Proyecto"}></Header>
        {project.length!=0 ?           <InfoDisplay element={project} url={'projects'} updateState={updateState}></InfoDisplay>
    : null
    }
        {epics == undefined ? <p>Cargando...</p> :
        ( 
            epics.length == 0 ? 
            <p>No hay Epicas disponibles...</p> 
            : 
            <>
            <AddForm type={'epics'} updateState={updateState} idProject={projectId}></AddForm>
            <CardContainer elements={epics}></CardContainer>   
            </>
        )
        }
        
        </>
    )
    }
