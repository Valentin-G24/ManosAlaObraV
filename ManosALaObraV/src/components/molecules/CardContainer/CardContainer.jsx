import React from 'react';
import Card from '../Card/card';
import styles from './CardContainer.module.css';

export default function CardContainer({ elements }) {
    if (!Array.isArray(elements) || elements.length === 0) {
        return null; // No renderiza nada si `elements` no es un arreglo o está vacío
    }

    return (
        <div id={styles.PrinDivProject}>
        <div id={styles.cardContainer}>
            {elements.map((element) => (
            <Card url={element._id} content={element.name} key={element._id} />
            ))}
        </div>
        </div>
    );
}
