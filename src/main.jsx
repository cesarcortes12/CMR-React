import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente, {action as nuevoClienteAction} from './pages/NuevoCliente'
//tenemos el loader con un alias  para que no entre en conflicto con otros
import Index, {loader as clientesLoader} from './pages/Index'
//NOTA: en components poenmos lo  que es reutilizable y en pages las paginas que vamos definiendo 
//creatBrowser nos permite defiir todas las rutas mediante un objeto
//el routerprovider es el componente principal desde donde empiezan a fluir los datos a otros componentes 
//el router espera un prop

import EditarCliente, {loader as editarClienteLoader , action as editarClienteAction } from './pages/editarCliente'
import ErrorPage from './components/ErrorPage'
import {action as eliminarCLienteAction} from './components/Cliente'

//aqui se crea el arreglo de la rutas
const router=createBrowserRouter([
  {
    path: '/', //pagina principal
    element: <Layout/>,
    children:[
      //es lo que se va a mostrar en pantalla puede ser html o un componente y children es la
      //manera en la que se le pasa a ese componente el contenido TODO LOS QUE ESTE DENTRO DEL CHILDREN 
      //VA A TENER APLICADO EL LAYOUT

        {
          index: true,
          element: <Index/>,
          loader: clientesLoader,
          errorElement: <ErrorPage/>
        },

        {
          path: '/clientes/nuevo',
          element: <NuevoCliente/>,
          action : nuevoClienteAction,
          errorElement: <ErrorPage/>
        },

        {
          path: '/clientes/:clienteId/editar', //esos dos puntos es una sintaxis especial para el direccionamiento dinamico
                                               //y el valor es cambiante
          element:  <EditarCliente/>,
          loader: editarClienteLoader,
          action: editarClienteAction,
          errorElement: <ErrorPage/>

        },

        {
          path:'/clientes/:clienteId/eliminar',
          action: eliminarCLienteAction

        }
    ] 
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <RouterProvider
       router={router}
    />
  </React.StrictMode>,
)
