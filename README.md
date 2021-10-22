# Examen 2 A01747290 Diego Palmerín

K hongo profe, hice todo con sequelize y luego me dijo "nah no quiero tu servidor, ta viejito" y como no quería meterme con hacerle upgrade a la versión de maria db a su instancia, mejor hice una base de datos terriblemente insegura que es un archivo .db en el proyecto :)))) le puse los métodos igual ai CRUD pero pus son comandos SQL básicamente


pa usar el API

`/ciudad`
este tiene CRUD tons:
* post hace post con el cuerpo (nombre, país y descripcion)
* get hace get si le manda nombre en el body
* put actualiza el objeto en la bd (id, nombre, pais, descripcion y popularidad)
* delete pus lo borra si le manda el id


`/ciudades/:pais`
Namás ponga el nombre del país y le regresa todo lo que tiene de ese país. Es case sensitive


y yap, gracias profe, ora sí me voy a dormir que mañana ya está bien pesado y ni ha empezado oficialmente, con su permiso


ah simón, igual si se mete a `/reset` resetea la bd porque pus, luego se ocupa eso
