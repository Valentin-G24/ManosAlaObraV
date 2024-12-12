import React, { useState, useEffect } from 'react';
import Input from '../../atoms/Input/input';
import Boton from '../../atoms/Boton/boton';
import styles from './Formulario.module.css';

export default function Formulario({ addTask }) {
    const [inputValue, setInputValue] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputValue.trim() !== '') {
        addTask(inputValue);
        setInputValue('');
        }
    };

    useEffect(() => {
        const scrollHandler = () => {
        setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    return (
        <div className={isScrolled ? styles.formContainerScrolled : styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formElements}>
            <Input value={inputValue} setValue={setInputValue} />
            <Boton />
            </div>
            <div className={isScrolled ? styles.formBackgroundScrolled : styles.formBackground} />
        </form>
        </div>
    );
}
