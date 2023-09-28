export async function obtenerClientes() {
    /*utilizamos variables de entorno para consumir apis significa que en el 
    entorno de desarrollo puede tener un valor diferente al de producccion
     en VITE se crea un archivo unarchivo .env 
    */
    const respuesta = await fetch(import.meta.env.VITE_API_URL) //este es el fetch hacia la url
    const resultado = await respuesta.json()
    return resultado;
}

export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`) //este es el fetch hacia la url y el id
    const resultado = await respuesta.json()
    return resultado;
}

export async function agregarCLiente(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {

    }

}

export async function actualizarCLiente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await respuesta.json()
    } catch (error) {

    }
}

export async function eliminarCLiente(id){
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE',
            
            })
        await respuesta.json()
    } catch (error) {

    }
}