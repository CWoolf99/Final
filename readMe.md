Proyecto Final del curso de backend de coderhouse

Este proyecto es una una api rest que utiliza mongo atlas de base de datos y consiste en el backend de un ecommerce en el que se pueden modifcar los productos del mismo y manipular los carritos del los clientes para generar órdenes de compra. A su vez tiene un sistema de autenticación que útiliza jwt.  

Iniciar  modo fork ejemplo:nodemon main.js

Iniciar modo cluster ejemplo: nodemon main.js Cluster

Instalar dependencias: npm i

Dependencias: 
    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-handlebars": "^6.0.6",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^6.6.4",
    "nodemailer": "^6.8.0",
    "nodemon": "^2.0.20",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.1",
    "passport-local": "^1.0.0",
    "pino": "^8.7.0",
    "socket.io": "^4.5.1"

(Todas las colecciones de las bases de datos que utilizon las rutas se encuentran en el archivo dao factory de la respectiva ruta con excepción del las de usuarios que se encuentra en ./presistencia/modelos/user.js)

Rutas:

    Login y singup:
        Get / || Get /signup
        Las rutas de login y signup renderizan vistas con hbs para que inicies sesión o te registres llenando los forms de las vistas.
    
    Productos:
        Get /productos?token=PegarTokenAquí
        Devuelve los productos almacenados en la base de datos
        (Requiere jwt por params para poder ver el resultado)

        Get /productos/"id de producto a buscar"?token=PegarTokenAquí
        Devuelve el producto encontrado
        (Requiere jwt por params para poder ver el resultado)

        Get /productos/categoria/"Categoría que buscas"
        Devuelve los productos de la categoría enviada por params

        Post /productos
        Crea un producto que se envía por body
        Ejemplo de body:
        {
            "nombre": "ProductoPost",
            "descripcion": "Una descripcion",
            "imagen": "https://www.comercialtrevino.com/wp-content/uploads/elementor/thumbs/productos-gancho-tienda-de-abarrotes-1-pdela7eo4tw4sjugftu36w5vxnjf5wzlrcvg7tkjgo.jpg",
            "precio": 120000,
            "categoria": "Una"
        }

        Put /productos/"id de producto a actualizar"
        Actualiza un producto con el body que se envía
        Ejemplo de body.
        {
            "nombre":"UnProductoPut",
            "descripcion":"Otra como descripcion",
            "imagen":"https://www.comercialtrevino.com/wp-content/uploads/elementor/thumbs/productos-gancho-tienda-de-abarrotes-1-pdela7eo4tw4sjugftu36w5vxnjf5wzlrcvg7tkjgo.jpg",
            "precio":4000,
            "categoria":"Una"
        }

        Delete /productos/"id de producto a eliminar"
        Elimina el producto con el id enviado por params

    Carritos:
        Get /carrito?token=PegarTokenAquí
        Devuelve el carrito del usuario que se logueó con el token.
        (Requiere jwt por params para poder ver el resultado)

        Post /carrito/"Email de carrito al que se le agregará el producto"
        Inserta un producto (Poner id y cantidad en body) al carrito del email que llega de params
        Ejemplo de body:
        {
            "id":"63e914e5afd49a8b7d4f099c",
            "cantidad":6
        }

        Delete /carrito/"Email/productos/"id del producto"
        Elimina el producto con el id enviado del carrito con el email de params

        Delete /carrito/"Email"
        Elimina el carrito del email de params

    Chat:
        Get /chat?token=PegarTokenAquí
        Devuelve una vista con un websocket y se logue con la cuenta del token para poder usar el chat
        (Requiere jwt por params para poder ver el resultado)

        Get /chat/"Email"
        Devuelve los mensajes enviados por el email de params

    Variables de entorno:
        Get /varEntorno
        Devuelve las variables de entorno usadas por el server





