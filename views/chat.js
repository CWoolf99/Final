const socket = io.connect();

const formMensaje = document.getElementById('formMensajes')
formMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const mensaje = { 
        usuario: formMensaje[0].value, 
        mensaje: formMensaje[1].value,
        isAdmin: formMensaje[2].value, 
    }
    socket.emit('nuevoMensaje', mensaje);
    formMensaje.reset()
})

socket.on('mensajes', (mensajes) => {
    const html = listaMensajes(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function listaMensajes(mensajes) {
    return mensajes.map(mensaje => {
        if (mensaje.isAdmin){
            return (`
                <div>
                    <b style="color:black;">Admin:${mensaje.usuario}</b>
                    [<span style="color:yellow;">${mensaje.timestamp}</span>] :
                    <i style="color:darkblue;">${mensaje.mensaje}</i>
                </div>
            `)
        } else {
            return (`
            <div>
                <b style="color:white;">Usuario:${mensaje.usuario}</b>
                [<span style="color:yellow;">${mensaje.timestamp}</span>] :
                <i style="color:darkred;">${mensaje.mensaje}</i>
            </div>
            `) 
        }
    }).join(" ");
};