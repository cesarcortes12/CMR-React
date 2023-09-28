import React from 'react'
import { Form,useNavigate ,useLoaderData, useActionData,redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import { obtenerCliente, actualizarCLiente } from '../data_o_API/clientes'
import Error from '../components/Error'

export async function loader({params}){
    const cliente = await obtenerCliente(params.clienteId)
    if (Object.values(cliente).length==0){
      throw new Response('',{ //creamos un mensaje de  error nosotros mismos para mostrar
        status:404,
        statusText: "El cliente no fue encontrado"
      })
    }
  
    return cliente
}


export async function action({request,params}){
  const formData = await request.formData()
  //console.log(...formData)esto es una forma de obtener los datos
  const datos = Object.fromEntries(formData) ///otra forma de traer los datos 

  //validamos un campo en especifico
  const email = formData.get('email')
  //validacion en react
  const errores=[]
  if (Object.values(datos).includes("")){
      errores.push("todos los campos son obligatorios")
  }
  //expresion regular para comprobar email
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!regex.test(email)){
    errores.push("el email no es valido")
  }
  //vamos a retornar los errores si los hay
  if(Object.keys(errores).length){
    return errores
  }

   //actualizamos el cliente
   await actualizarCLiente(params.clienteId,datos)
   return redirect('/') //es aconsejable el redirect para redirreccionar sin la accion de un boton
}







function EditarCliente() {

  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()
  

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900">Editar CLiente</h1>
    <p className='mt-3'>A continuacion podras modificar los datos de un cliente</p>
  
  <div className='flex justify-end'>
    <button 
      className='bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded-md'
      onClick={()=>navigate('/')} //mediante una arow function se le indica hacia donde navegara
      >
      Volver
    </button>
  </div>

  <div className='bg-gray-200 shadow rounded-md md:w-3/4 mx-auto px-5 py-10 my-20'>
    {errores?.length && errores.map((error,i) => <Error key={i}>{error}</Error>)}
    <Form
        method='POST'
        noValidate // va a evitar  que html5 realiza por defecto
        
      >
    
      <Formulario
        cliente ={cliente}
      />
      <input 
        type='submit' 
        className='mt-5  w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
        value="Guardar cambios"
        >
      </input>
      
    </Form>
    

    
  </div>


  </>
  )
}

export default EditarCliente