import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ titulo }) => {
    
    const navigate = useNavigate();

    // Función para manejar la navegación hacia atrás
    const goBack = () => {
        navigate(-1);  // Retrocede una página en el historial
    };

    return (
        <div className={styles.PrinDiv}>
        <button
            className={styles.HeaderButton} 
            onClick={goBack} 
            aria-label="Volver atrás"  
        >
            <IoIosArrowBack />
        </button>
        <h1 className={styles.HeaderH1}>{titulo}</h1>
        </div>
    );
};

export default Header;
