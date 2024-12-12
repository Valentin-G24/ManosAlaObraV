import React, { useState } from 'react';
import styles from './InfoDisplay.module.css';
import Card from '../Card/card';
import Edit from '../Edit/edit';
import DeleteButton from '../DeleteButton/deleteButton';

export default function InfoDisplay({ element, url, updateState }) {
    
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <div className={styles.container}>
        <div className={styles.contentWrapper}>
            <button className={styles.toggleButton} onClick={toggleContent}>
            <Card content={(
                <>
                <h3>Name: {element.name}</h3>
                {element.description && <p>Description: {element.description.slice(0, 25)}...</p>}
                {isExpanded && (
                    <div className={styles.detailedInfo}>
                    <h3>Name: {element.name}</h3>
                    {element.description && <p>Description: {element.description}</p>}
                    <p>ID: {element._id}</p>
                    {element.members && <p>Members: {element.members}</p>}
                    {element.owner && <p>Owner: {element.owner}</p>}
                    </div>
                )}
                </>
            )} />
            </button>
            <div className={styles.actions}>
            <Edit url={`/${url}/${element._id}`} updateState={updateState} />
            <DeleteButton url={`/${url}/${element._id}`} updateState={updateState} />
            </div>
        </div>
        </div>
    );
}
