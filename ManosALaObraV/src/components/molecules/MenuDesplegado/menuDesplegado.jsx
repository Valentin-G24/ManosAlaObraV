import React, { useContext } from 'react';
import styles from './MenuDesplegado.module.css';
import { MenuContext } from '../VentanaPrincipal/ventanaPrincipal';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const MenuDesplegado = () => {
    const { isOpen, setIsOpen } = useContext(MenuContext);

    // Función para cerrar el menú
    const closeMenu = () => {
        setIsOpen(false);
    };

    // Componente reutilizable para los links
    const NavLink = ({ to, label, closeMenu }) => (
        <Link to={to} onClick={closeMenu}>
        <button className={styles.botonNav}>{label}</button>
        </Link>
    );

    return (
        <div className={`${styles.PrinDiv} ${isOpen ? styles.Visible : styles.NotVisible}`}>
        <div className={styles.Encabezado}>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.botonNav}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}  
            >
            <IoIosArrowBack />
            </button>
            <h1>Marca</h1>
        </div>

        <nav className={styles.Nav}>
            <NavLink to="/" label="Inicio" closeMenu={closeMenu} />
            <NavLink to="/my-projects" label="Mis proyectos" closeMenu={closeMenu} />
            <NavLink to="/my-stories" label="Mis historias" closeMenu={closeMenu} />
        </nav>

        <div className={styles.userProfile}>
            <NavLink to="/settings" label="Perfil" closeMenu={closeMenu} />
        </div>
        </div>
    );
};



export default MenuDesplegado;
