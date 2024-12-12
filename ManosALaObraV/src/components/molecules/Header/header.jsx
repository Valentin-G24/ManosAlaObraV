import React, { useContext } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MenuContext } from '../VentanaPrincipal/ventanaPrincipal';
import styles from './Header.module.css';

const Header = ({ titulo }) => {
    // Destructura isOpen y setIsOpen directamente del contexto
    const { isOpen, setIsOpen } = useContext(MenuContext);


    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);  // Alternamos el estado de isOpen
    };

    // Definimos el texto del aria-label basado en el estado actual del menú
    const ariaLabel = isOpen ? 'Cerrar menú' : 'Abrir menú';

    return (
        <div className={styles.PrinDiv}>
        <button
            className={styles.HeaderButton}
            onClick={toggleMenu} 
            aria-label={ariaLabel} 
        >
            <GiHamburgerMenu />
        </button>
        <h1 className={styles.HeaderH1}>{titulo}</h1>
        </div>
    );
};

export default Header;
