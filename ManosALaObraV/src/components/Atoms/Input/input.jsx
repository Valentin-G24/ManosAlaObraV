import React, { useState, useEffect } from 'react';
import { inputEntrada } from './Input.module.css';

export default function Input({ value, setValue }) {
    const [placeHolder, setPlaceHolder] = useState('');

    useEffect(() => {
    // Función para manejar el scroll
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setPlaceHolder('Ingrese el nombre de la tarea');
        } else {
            setPlaceHolder('');
        }
    };

    // Agregar el event listener para el scroll
    window.addEventListener('scroll', handleScroll);

    // Cleanup: eliminar el event listener cuando el componente se desmonte
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    return (
    <input
        type="text"
        placeholder={placeHolder}
        value={value}
        id={inputEntrada}
        className={inputEntrada} // Aplicar la clase CSS
        onChange={(e) => setValue(e.target.value)} // Actualizar el estado con el valor del input
    />
    );
}
