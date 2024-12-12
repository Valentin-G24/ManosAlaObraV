import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Estado para la autenticación
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const header = {
                'Content-Type': 'application/json',
                'auth': token,
            };

            fetch('https://lamansysfaketaskmanagerapi.onrender.com/api/users', {
                method: 'GET',
                headers: header,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al autenticar');
                    }
                    return response.json();
                })
                .then((data) => {
                    setIsAuthenticated(data.success !== false);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setIsAuthenticated(false); // Error, no autenticado
                });
        } else {
            setIsAuthenticated(false); // No hay token, no autenticado
        }
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Mientras espera la respuesta de autenticación
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}
