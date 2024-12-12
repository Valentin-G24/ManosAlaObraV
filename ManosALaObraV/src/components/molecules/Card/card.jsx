import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ url, content }) {
    return url ? (
        <Link to={url} className={styles.card}>
        {content}
        </Link>
    ) : (
        <div className={styles.card}>{content}</div>
    );
}
