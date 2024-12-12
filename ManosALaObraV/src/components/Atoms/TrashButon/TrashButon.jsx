import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6"; // Importar ícono de papelera
import styles from './TrashCanButon.module.css';

export default function TrashButon({ deleteTask }) {
    return (
        <button onClick={deleteTask} id={styles.TrashCanButon}>
        <FaRegTrashCan /> {/* Renderiza el ícono de papelera */}
        </button>
    );
}
