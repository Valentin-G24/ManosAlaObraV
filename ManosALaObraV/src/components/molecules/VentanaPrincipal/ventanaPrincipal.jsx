import React, { useContext, createContext, useState } from 'react';
//import styles from './VentanaPrincipal.module.css';
import Header from '../Header/header';
import MenuDesplegado from '../MenuDesplegado/menuDesplegado';
import { useLocation } from 'react-router-dom';

export const MenuContext = createContext();

const getTitulo = (pathname) => {
    switch (pathname) {
        case '/':
        return 'Inicio';
        case '/my-projects':
        return 'Mis proyectos';
        case '/my-stories':
        return 'Mis historias';
        default:
        return '';
    }
};

export default function VentanaPrincipal() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const titulo = getTitulo(location.pathname);

    return (
        <MenuContext.Provider value={{ isOpen, setIsOpen }}>
        <MenuDesplegado />
        <Header titulo={titulo} />
        </MenuContext.Provider>
    );
}
