import { Navigate } from 'react-router-dom'
import './App.css'
import VentanaPrincipal from './components/molecules/VentanaPrincipal/ventanaPrincipal'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>
      <VentanaPrincipal></VentanaPrincipal>
      <Outlet />
    </>
  )
}

export default App
