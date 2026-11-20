# Trabajo práctico 07
## Proyecto de partida y cambios
El proyecto de partida fue el Trabajo Práctico Nº 6 (tp-06-salas-modular), el cual es un programa que permite leer un catálogo de reservas de salas de estudios desde una constante reservas definido en el index.js como un arreglo de objetos. 
Este programa permite leer el contenido de reservas, el cual es utilizado a traves del servidor express, para poder mostrar con distintos EndPoints como ser: 
* Listado de todas las reservas.
* Mostrar el detalle de una reserva seleccionada (especificada por id en el endpoint).
* Agregar una nueva reserva. 

A este programa de base "tp-06-salas-modular", se le agregó las carpetas: 
* scripts(en la raiz)
* config(dentro de src)
* modelos (dentro de src). 
* A la vez se definio la conexión a MongoDB en el archivo .env.

Dentro de la carpeta scripts se definieron los scripts:
* comprobar-conexion.js (comprueba la conexión a la base de datos en MongoDB)
* crear-reserva.js (crea una reserva en la Base de datos reservas_salas_u7)
* listar-reservas.js (muestra por consola todas las reservas de la Base de datos reservas_salas_u7 y el numero total de reservas)

Las distintas funciones, endpoints y middleware estaban definidos en el archivo index.js.
Al separa en módulos, las mismas fueron reubicadas en carpetas de acuerdo a la misión que cumplen, como ser: rutas (deifne el router y los endpoints), middleware (validaciones y solicitudes), controlador (renderiza las vistas) y servicios (interacción con los datos). En el index se crea los servicios de reserva, que luego es parametro al invocar la funcion app.js, en la que se crea el controlador (utilizando el servicio creado como parámetro), para poder acceder a los endponits mediante las rutas establecidas utilizando la libreria Router de Express. También utiliza configuracion.js donde esta definido el puerto a utilizar, como el formato del registro para morgan. 

## Versiones utilizadas
* "ejs": "^7.0.2",
* "express": "^5.3.0",
* "express-ejs-layouts": "^2.5.1",
* "mongoose": "^9.12.3",
* "morgan": "^1.12.1" 

Confirmación del uso de Atlas Free:
npm run comprobar

> comprobar
> node --env-file=.env scripts/comprobar-conexion.js

Conexión con MongoDB establecida.

##  Pasos desde una descarga nueva
* Instalar Mongoose(npm install mongoose): Paquete de Node.js que permite definir esquemas, construir modelos y operar documentos. Es un ODM: relaciona objetos de la aplicación con documentos
* La aplicación usa Mongoose para comunicarse con el servidor.

* Entrar a MongoDB Atlas (https://www.mongodb.com/es/products/platform/atlas-database, donde tenemos que crear o utilizar una cuenta de mail para registrarnos. Se debe completar la verificación que solicite el servicio.
* Elegir la creación de un clúster y seleccionar Free / M0.  Elegir uno de los proveedores y
regiones disponibles para esa opción, asignar un nombre, por ejemplo curso-nodejs , y confirmar la creación.
* En la configuración de acceso a la base, crear un usuario con contraseña. Este usuario lo utiliza Node.js para operar documentos: es diferente de la cuenta con la que entramos al panel de Atlas. Guardar su contraseña de manera privada.
* En Network Access / IP Access List, agregar la IP pública actual de la conexión con la que trabajamos; elasistente puede ofrecer Add My Current IP Address. Esperar a que la regla esté activa. Si cambiamos de red, puede ser necesario actualizarla.
* En el clúster, abrir Connect -> Drivers y seleccionar Node.js. Copiar la cadena de conexión ofrecida por Atlas. Mongoose usa el driver de MongoDB internamente. En esa cadena reemplazar los marcadores del usuario y la contraseña.
* Copiar la cadena de conexión en .env y asginarla con el nombre MONGODB_URI.

## Diagnostico de DNS:
En el presente trabajo práctico, en el archivo base.datos.js, se agregó node:dns y se ejecutó
dns.setServers(["8.8.8.8", "1.1.1.1"]) antes de conectar.
DNS traduce nombres y permite consultar registros. Con una URI mongodb+srv:// , el driver consulta registros SRV para descubrir los servidores y TXT para obtener opciones. Una falla como querySrv ECONNREFUSED indica que falló esa consulta DNS; no demuestra que Atlas haya rechazado la contraseña. Los mensajes ENOTFOUND , ETIMEOUT o ESERVFAIL también requieren revisar host, DNS y red según la operación que falló.
La lista configura servidores DNS públicos para las consultas de resolución de este proceso Node.js: 8.8.8.8 y 1.1.1.1. No cambia el DNS de Windows, del navegador o de Compass, ni abre permisos en Atlas

## Mapa de archivos
tp-07-salas-mongodb/
* -- public/                   # conservar CSS y otros recursos
* -- scripts/
*   |-- comprobar-conexion.js  # permite comprobar conexión a base datos reservas_salas_u7 en MongoDB
*   |-- crear-reserva.js       # permite crear una reserva en la base datos reservas_salas_u7 en MongoDB
*   |-- listar-reservas.js     # permite listar las reservas de base datos reservas_salas_u7 en MongoDB
* -- views/                    # conservar layout y vistas
* -- src/
*   |-- index.js              # crea dependencias y arranca
*   |-- app.js                # configura Express y monta routers
*   |-- config/     
*       |-- base-datos.js    # conecta y desconecta a Base dde datos MongoDB
*       |-- entorno.js       # procesa process.env
*   |-- rutas/reservas.js
*   |-- controladores/reservas.js
*   |-- servicios/reservas.js
*   |-- middleware/
*       |-- solicitudes.js    # ID y tiempo
*       |-- reservas.js       # sección y validación
|-- modelos/
*       |-- reservas.js       # Definicion del esquema para el modelo de la reserva
* -- .env
* -- .gitignore
* -- eslint.config.js
* -- package.json
* -- package-lock.json
* -- README.md

* Un esquema (Schema) define la estructura y reglas de los datos. Se establecen los tipos de datos de cada campo (como String, Number, Boolean o ObjectId), valores por defecto, validaciones, etc.
* El modelo es el constructor que ejecuta operaciones en la base de datos a partir de ese esquema del punto anterior. Se crea compilando un esquema (Schema) y proporciona métodos para consultar, crear, actualizar y eliminar datos en la base de datos.
* Una colección es el grupo de documentos almacenados en MongoDB. Es la agrupación de documentos, similar a una tabla en bases de datos realcionales.

## Campos y reglas:

Definicion de un esquema para el modelo de la reserva:
const reservaSchema = new mongoose.Schema( 
  {
    //en estudiante no se pone un limite del largo de caracteres a ingresar
    estudiante: { type: String, required: true, trim: true }, 
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/@/, "Por favor ingresa un correo electrónico válido"],
    },
    sala: {
      type: String,
      enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
    },
    //En fecha no se controla que sea una fecha válida
    fecha: { type: String, required: true, trim: true }, 
    turno: {
      type: String,
      enum: ["Mañana", "Tarde", "Noche"],
    },
    personas: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      validate: {
        validator: Number.isInteger,
        message: "La cantidad de personas debe ser entera.",
      },
    },
  },

  //Se especifica el nombre de la coleccion en la base de datos donde se almacenarán los documentos de  este modelo
  { collection: "reservas" },
);

##  Matriz de pruebas

npm run comprobar

> comprobar
> node --env-file=.env scripts/comprobar-conexion.js

Conexión con MongoDB establecida.
---------------------------------------------------------------
npm run listar
> listar
> node --env-file=.env scripts/listar-reservas.js

┌─────────┐
│ (index) │
└─────────┘
Total de reservas: 0
---------------------------------------------------------------
npm run crear 

> crear
> node --env-file=.env scripts/crear-reserva.js

Reserva guardado. _id: 6b00af695542a4cf00ca8a64
---------------------------------------------------------------
npm run listar

> node --env-file=.env scripts/listar-reservas.js

 (index): 0  
 id: '6b00af695542a4cf00ca8a64  
 estudiante: 'Homero Sim      
 email: 'hsimpson@gmail.com
 sala: 'Sala Norte'
 fecha: '2026-10-27' 
 turno: 'Mañana'
 personas:2


## Matriz de pruebas:
* Conexión válida: 
> npm run comprobar
> node --env-file=.env scripts/comprobar-conexion.js

Conexión con MongoDB establecida.

* Variable vacía:
> npm run comprobar
> node --env-file=.env scripts/comprobar-conexion.js

No se pudo completar la conexión: Error
Revisar MONGODB_URI, servidor, red y permisos.

* Contraseña incorrecta temporal en el .env privado
> npm run comprobar
> node --env-file=.env scripts/comprobar-conexion.js

No se pudo completar la conexión: MongoServerError
Revisar MONGODB_URI, servidor, red y permisos.

* Colección vacía, si se dispone de una base nueva:
> npm run listar
> node --env-file=.env scripts/listar-reservas.js

┌─────────┐
│ (index) │
└─────────┘
Total de reservas: 0

* Reserva válida:
> npm run crear
> node --env-file=.env scripts/crear-reserva.js

Reserva guardado. _id: 6b00af695542a4cf00ca8a64

* Consulta desde proceso nuevo:
> npm run listar
> node --env-file=.env scripts/listar-reservas.js

 (index): 0  
 id: '6b00af695542a4cf00ca8a64  
 estudiante: 'Homero Sim      
 email: 'hsimpson@gmail.com
 sala: 'Sala Norte'
 fecha: '2026-10-27' 
 turno: 'Mañana'
 personas:2

* Segunda consulta:
> npm run listar
> node --env-file=.env scripts/listar-reservas.js

 (index): 0  
 id: '6b00af695542a4cf00ca8a64  
 estudiante: 'Homero Sim      
 email: 'hsimpson@gmail.com
 sala: 'Sala Norte'
 fecha: '2026-10-27' 
 turno: 'Mañana'
 personas:2

* Estudiante vacío:
estudiante: ""
> npm run crear 

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: estudiante

* Email sin @:
email: hsimpsongmail.com
> npm run crear

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: email

* Sala o turno no permitido:
sala: "Sala Oeste"
> npm run crear

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: sala
-------------------------------------------------------
turno: "Siesta"
> npm run crear

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: turno

* Fecha vacía:
> npm run crear

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: fecha

* Personas 0, 7 y 2.5:
> npm run crear

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: personas

* Personas con texto no numérico:
personas: "casa"
> npm run crear    

> crear
> node --env-file=.env scripts/crear-reserva.js

No se pudo crear la reserva: ValidationError
Campos a revisar: personas
Revisar datos, configuración y disponibilidad de MongoDB.

## Explicacion porque el sitio sigue en memoria
El sitio sigue en memoria porque lee un catálogo de reservas de salas de estudios desde una constante reservas definido en el index.js como un arreglo de objetos.
Lo que se abordará en la Unidad 8 es el cambio de la fuente de datos del sitio: rutas web y API consultarán el mismo modelo y la misma base de datos.

## Confirmación de que no se publican .env
* En el historial de Git (terminal): Se ejecuta git log --all --full-history -- "**/.env" para verificar si el archivo existió en algún commit anterior, incluso si luego se borró.
