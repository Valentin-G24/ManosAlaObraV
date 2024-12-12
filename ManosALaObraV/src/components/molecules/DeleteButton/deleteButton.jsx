import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import styles from './DeleteButton.module.css';
import { deleteFunc } from '../../../utils/ApiRequests';
import { useNavigate } from 'react-router-dom';

export default function DeleteButton({ updateState, url, type }) {
    const navigate = useNavigate();
    const [confirm, setConfirm] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteElement = (e) => {
        e.preventDefault();
        setLoading(true);
        deleteFunc(url)
        .then((data) => {
            setLoading(false);
            if (data.status === 'success') {
            updateState();
            if (type !== 'task') {
                navigate(-1);
            }
            } else {
            setShowError(true);
            }
        })
        .catch(() => {
            setLoading(false);
            setShowError(true);
        });
    };

    return (
        <div>
        <button
            id={styles.deleteButton}
            onClick={() => setConfirm(!confirm)}
            disabled={loading}
        >
            <MdDelete style={{ fontSize: '1.5rem' }} />
        </button>

        {confirm && (
            <div id={styles.floatingDiv}>
            <h3>¿Estás seguro de que deseas eliminar?</h3>
            <div id={styles.buttonCont}>
                <button onClick={deleteElement} disabled={loading}>
                {loading ? 'Eliminando...' : 'Sí'}
                </button>
                <button onClick={() => setConfirm(false)} disabled={loading}>
                No
                </button>
            </div>
            {showError && <h3>Hubo un error al intentar eliminar.</h3>}
            </div>
        )}
        </div>
    );
}
