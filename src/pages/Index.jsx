import React, { Component } from 'react'
import { obtenerClientes } from '../data_o_API/clientes';
import { useLoaderData } from 'react-router-dom';
//en lugar de ese effect vamos a usar loader y se eporta mediante una funcion y siempre retorna algo
//y se envia al main
import Cliente from '../components/Cliente';

export function loader() {
  const clientes = obtenerClientes()
  return clientes
  
}


function Index() {

  const clientes = useLoaderData();
  
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {clientes.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'> 
          <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Cliente</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {clientes.map((cliente)=>(
                <Cliente
                  cliente={cliente}
                  key={cliente.id}
                />
              ))}
          </tbody>
        </table>

      ): (
        <p className= "text-center mt-10">No Hay Clientes Aun</p>
      )}
    </>
  )
}

export default Index