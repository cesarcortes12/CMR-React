import React from 'react'
import { Navigate, useNavigate,Form,redirect } from 'react-router-dom'
import { eliminarCLiente } from '../data_o_API/clientes'

export  async function action ({params}){
  await eliminarCLiente(params.clienteId)
  return redirect('/')
}



function Cliente({cliente}) {


    const navigate = useNavigate() //este hook nos permite navegar de forma programada
    const {nombre,empresa,email,telefono,id}=cliente
  
    /*notas
    el eliminar esta rodeado de un action para poder en viar una accion
    tambien le definimos alaccion con un path para que la accion vaya a otra pagina
     */




  return (
    <tr className='border-b'>
        <td className='p-4 space-y-2'>
            <p className='text-2xl text-gray-800'>{nombre}</p>
            <p>{empresa}</p>
        </td>
        <td className='p-6'>
            <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
            <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>Telefono: </span>{telefono}</p>
        </td>
        <td className='p-6 flex space-x-5'>
            <button 
              type='button'
              className='text-blue-600 hover:text-blue-700 uppercase font-bold text-xs'
              onClick={ ()=>navigate(`/clientes/${id}/editar`)} //al url se le pasa el id
            >
              Editar
            </button>
          
          <Form
            method='post'
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e)=>{
              if(!confirm("Deseas elminar este registro")){
                e.preventDefault()
              }
            }}
          > 
            
          <button 
              type='submit'
              className='text-red-600 hover:text-red-700 uppercase font-bold text-xs'
            >
              Eliminar    
            </button>

          </Form>

            
        </td>
    </tr>
  )
}

export default Cliente