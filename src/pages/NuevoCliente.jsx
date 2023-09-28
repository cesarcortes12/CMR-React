//rfce
import React from 'react'
import { useNavigate,Form,useActionData,redirect } from 'react-router-dom' //hook para navegar entre paginas
import Formulario from '../components/Formulario'
import Error from '../components/Error'
import { agregarCLiente } from '../data_o_API/clientes'

export async function action({request}){ //en react router el action es mediante funcion y se envia al main
  //tambien en un action que este asociado a un formulario lleva un request
  //el envio del formulario se realiza mediante una funcion asincrona
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
  
   await agregarCLiente(datos)
   return redirect('/') //es aconsejable el redirect para redirreccionar sin la accion de un boton
}



function NuevoCliente() {

  const errores = useActionData() //de esta forma pasamos lo obtenido en la funcion action
  const navigate = useNavigate()

  console.log(errores)
  
  // optional chainging o corto circuito utlizado en el form
  //error tiene apertura y cierre por que se le pasa un children
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo CLiente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>
    
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
      
        <Formulario/>
        <input 
          type='submit' 
          className='mt-5  w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
          value="Registrar Cliente"
          >
        </input>
        
      </Form>
      

      
    </div>


    </>
  )
}

export default NuevoCliente