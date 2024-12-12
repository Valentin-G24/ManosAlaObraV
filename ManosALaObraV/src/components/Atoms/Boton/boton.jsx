import React from "react";
import styles from "./boton.module.css"
import { ImCheckmark } from "react-icons/im";


export default function Boton() {
    return (
    <>
        <button id={styles.boton}><ImCheckmark />
        </button>
    </>
    );
}