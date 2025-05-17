# Historias de Usuario sistema SINAI

## 0000 \- Como Usuario quiero poder realizar consultas de las actividades de investigación para mantenerme informado de investigaciones recientes

Descripción: Cualquier usuario, registrado o no, puede realizar consultas de las actividades de investigación y desarrollo de los profesores de la universidad

Criterios de aceptación:

1. Seleccionar tipo de consultar: profesor, grupo, departamento, coordinación y división  
2. Filtrar la consulta por rango de fecha inicial y final  
3. Filtrar consulta por tipo de actividad  
4. Ver tabla con el conteo de actividades por año, por tipo de actividad y el total  
5. Listar los tipos de actividades por cada año con los autores e información  
6. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema

# Historias rol Profesor

## 0001 \- Como Profesor quiero poder registrarme en el sistema para llevar el control de mi información de investigación y desarrollo

Descripción: El profesor de la universidad se registra en el sistema con sus datos personales y académicos.

Criterios de aceptación:

1. Datos personales solicitados:  
   1. Nombre completo  
   2. Correo institucional  
   3. Perfil, con formato Apellido, Nombre  
   4. Cédula de identidad  
   5. Sexo  
   6. Categoría: "Agregado" , "Asistente" , "Asociado" , "Instructor" , "Titular"  
   7. Condición: "Contratado", "Ordinario", "Jubilado"  
   8. Dedicación: "Convencional", "Exclusiva", "Integral"  
   9. PEI  
      1. Número  
      2. Año  
      3. Nivel  
   10. Último Diploma: "Lic.", "Ph.D.", "Doctor", "Magister", "Ing."  
   11. Universidad del último diploma  
   12. Departamento  
   13. Página Web Personal (si tiene)  
   14. Perfiles Orcid, Google Schoolar y Research Gate  
       1. Id  
       2. Link del perfil  
2. El usuario se registra en la base de datos como no activo  
3. Se notifica al coordinador de su departamento para activarlo en el sistema

## 0002 \- Como Profesor quiero consultar mis actividades de investigación y desarrollo para revisar de forma organizada la información

Descripción: La página principal del profesor muestra un resumen de sus actividades de investigación y desarrollo.

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año, por tipo de actividad y el total  
2. Tener enlace en los nombres de los coautores que son profesores de la universidad para poder ir a ver sus actividades de investigación. Se muestra la información como en esta página principal.  
3. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema  
4. Listar los tipos de actividades por cada año con los autores e información:  
   1. Artículo en Revista  
      1. Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS  
      2. Publicaciones en Revistas Indexadas en Otros Índices  
      3. Publicaciones en Revistas Arbitradas No Indexadas  
      4. Artículos Aceptados en Vías de Publicación  
   2. Capítulo de Libro  
      1. Publicaciones de Capítulos de Libros  
   3. Composición  
      1. Composiciones Solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas  
   4. Evento  
      1. Asistencia a Eventos Internacionales  
      2. Asistencia a Eventos Nacionales  
   5. Exposición  
      1. Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados  
   6. Grabación  
      1. Grabaciones Sonoras Evaluadas Por Árbitros  
   7. Informes Técnicos  
   8. Libro  
      1. Libro Nacional  
      2. Libro Internacional  
   9. Memoria  
      1. Memorias \*Arbitradas\* de Congresos  
   10. Partitura  
       1. Partituras, Video o CD's Publicados en Editoriales Reconocidas  
   11. Patente  
       1. Patentes Nacional  
       2. Patentes Internacional  
   12. Premios  
   13. Premio Bienal  
       1. Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones  
   14. Tesis de Grado  
       1. Tutoría de Tesis Doctorales  
       2. Tutoría de Trabajos de Grado (Maestrías)  
       3. Tutoría de Proyectos de Grado (Especializaciones)  
       4. Proyectos de Grado (Postgrados)  
       5. Tutoría de Proyectos de Grado (Licenciaturas)  
       6. Tutoría de Proyectos de Grado (Ingenierías)  
       7. Proyectos de Grado (Pasantías Largas)  
   15. Proyecto de investigación  
       1. Proyectos de IYD (Vigentes)  
       2. Proyectos de IYD  
   16. Recital  
       1. Recitales o Conciertos Arbitrados

## 0003 \- Como Profesor quiero poder agregar nuevas actividades para actualizar la producción de mi investigación y desarrollo

Descripción:Opción para ingresar mis nuevas actividades de investigación y desarrollo que he realizado.

Criterios de aceptación:

1. Título de la actividad  
2. Poder agregar coautores de la universidad profesores o estudiantes:
   1. Agregar por defecto como autor al profesor que crea la actividad (sesión iniciada actual)  
   2. Seleccionar de lista de profesores activos en el sistema  
   3. Nombre, correo y carrera del estudiante  
   4. Poder indicar si es ponente, tutor  
3. Poder agregar coautores externos a la universidad, profesores o estudiantes.  
   1. Nombre  
   2. Correo  
   3. Carrera del estudiante  
   4. Poder indicar si es ponente, tutor  
   5. Universidad a la que pertenece  
4. Poder agregar los grupos asociados, excepto para patentes y premios  
5. Poder agregar observaciones  
6. Agregar desde el menú mostrando la lista de los tipos de actividades que se pueden crear:  
   1. Artículos en Revistas  
      1. Indicar si es invitado  
      2. Estado: “Aceptado en Vías de Publicación”, “Publicado  
      3. Fecha de publicación  
      4. Índice  
      5. Páginas inicial y final  
      6. Cantidad de páginas  
      7. Nombre de la Revista Arbitrada  
      8. Volumen  
   2. Capítulos de Libros  
      1. Indicar si ha sido aceptado para publicación  
      2. Indicar si es artículo invitado  
      3. País y Ciudad  
      4. Título del Libro  
      5. Páginas inicial y final  
      6. Casa Editorial  
      7. Fecha  
      8. Poder agregar los nombres de los editores  
      9. ISBN  
   3. Composiciones solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas  
      1. Categoría: "Composición", "Arreglo", "Ejecución"  
      2. País y Ciudad  
      3. Fecha  
      4. Quién realizó el financiamiento  
      5. Jurado, Árbitro o Comité Editorial  
      6. Nombre del evento  
   4. Asistencia a Eventos  
      1. País y Ciudad  
      2. Institución que financia o patrocina  
      3. Nombre del Evento  
      4. Fecha  
      5. Modalidad: "Cartel", "Oral", "Invitada"  
   5. Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados  
      1. Nombre del Evento  
      2. Fecha  
      3. Categoría  
      4. País y Ciudad  
      5. Quién lo financia  
      6. Quién lo organiza  
   6. Grabaciones Sonoras Evaluadas por Árbitros  
      1. Nombre de la Editorial  
      2. Fecha  
      3. Nacional o internacional  
      4. Categoría:  
         1. "Ejecucion en CD Nacional"  
         2. "Ejecucion en CD Internacional"  
         3. "CD Completo Nacional"  
         4. "CD Completo Internacional"  
         5. "Premio Nacional por Concurso"  
         6. "Premio Internacional por Concurso"  
      5. Jurado, Árbitro o Comité Editorial  
      6. Quién lo financia  
      7. Depósito Legal  
   7. Informes Técnicos  
      1. Fecha inicio  
      2. Duración estimada en meses  
      3. Si tiene contrato de Confidencialidad  
      4. Si ha sido evaluado por el DID  
      5. Agregar nombre de evaluadores  
      6. Institución que financia  
   8. Libros Publicados  
      1. Nombre de la Editorial  
      2. Fecha  
      3. ISBN  
      4. País y Ciudad  
      5. Si ha sido aceptado para Publicación  
   9. Memorias de Congresos  
      1. Nombre del Evento  
      2. Fecha  
      3. País y Ciudad  
      4. Nombre del Medio de Publicación  
      5. Volumen  
      6. ISBN  
      7. Páginas inicial y final  
      8. Cantidad de páginas  
      9. Formato: "CD", "Libro", "Revista"  
      10. Tipo de congreso: "Nacional", "Internacional"  
      11. Indicar si es con estudiantes  
   10. Partituras, Videos o CDs publicados en editoriales reconocidas  
       1. Nombre de la Editorial  
       2. Fecha  
       3. Nacional o Internacional  
       4. Categoría:  
          1. "Ejecucion en CD Nacional"  
          2. "Ejecucion en CD Internacional"  
          3. "CD Completo Nacional"  
          4. "CD Completo Internacional"  
          5. "Premio Nacional por Concurso"  
          6. "Premio Internacional por Concurso"  
       5. Jurado, Árbitro o Comité Editorial  
       6. Depósito Legal  
       7. Quién lo financia  
   11. Patentes  
       1. Fecha de inicio y final (Vigencia)  
       2. Número  
       3. País que otorga  
   12. Premios  
       1. Fecha  
       2. Institución que lo otorga  
   13. Trabajos Reconocidos o Premiados en Bienales, Salones, Concursos o Exposiciones  
       1. Título del Premio  
       2. Nombre del Evento  
       3. Fecha  
       4. Categoría  
       5. Institución organizadora  
       6. Quién lo financia  
       7. País y Ciudad  
   14. Proyectos de Grado Dirigidos  
       1. Coordinación académica  
       2. Fecha defensa  
       3. Título Académico al que se optó  
       4. Nivel académico  
   15. Proyectos de Investigación y Desarrollo  
       1. Fecha de inicio  
       2. Duración estimada en meses  
       3. Institución que financia o patrocina: Fonacit u Otro  
       4. Monto financiado  
       5. Moneda  
   16. Recitales o Conciertos Arbitrados  
       1. Nombre del Evento  
       2. Fecha  
       3. Jurado o Árbitro  
       4. Quién lo financia  
       5. País y Ciudad

## 0004 \- Como Profesor quiero poder modificar las actividades que he creado para corregir o actualizar los datos

Descripción: Se modifican las actividades ya creadas en el sistema

Criterios de aceptación:

1. Desde mi lista de actividades tener la opción para ir a modificar la actividad  
2. Se pueden modificar todos los campos  
3. Puedo modificar solamente actividades que he creado yo, pero no otros profesores

## 0005 \- Como Profesor quiero poder eliminar las actividades que he creado para corregir datos incorrectos

Descripción: Se eliminan las actividades ya creadas en el sistema

Criterios de aceptación:

1. Desde mi lista de actividades tener la opción para eliminar la actividad  
2. Confirmar la eliminación de la actividad  
3. Puedo eliminar solamente actividades que he creado yo, pero no otros profesores

## 0006 \- Como Profesor quiero poder revisar mi perfil para actualizar mi información personal y académica

Descripción: Ver el perfil personal con los datos personales y académicos

Criterios de aceptación:

1. Opción desde el menú para ir al perfil  
2. Se pueden actualizar los siguientes datos:  
   1. Perfil  
   2. Pág web personal  
   3. Categoría  
   4. Dedicación  
   5. Datos PEI  
   6. Último diploma  
   7. Universidad último diploma  
   8. Líneas de investigación  
   9. Perfiles Orcid, Google Schoolar y Research Gate  
      1. Id  
      2. Link del perfil

## 0007 \- Como Profesor quiero consultar las actividades de los grupos de los que soy responsable para revisar de forma organizada la información

Descripción: Se visualizan las actividades de investigación y desarrollo que pertenecen a ese grupo

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año, por tipo de actividad y el total  
2. Tener enlace en los nombres de los autores que son profesores de la universidad para poder ir a ver sus actividades de investigación. Se muestra la información como en esta página.  
3. Listar los tipos de actividades por cada año con los autores e información  
4. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema

## 0008 \- Como Profesor quiero poder generar mi reporte BRA para cumplir con la convocatoria BRA

Descripción: Se genera un reporte con la información personal y académica, y las actividades de investigación creadas dentro de la fecha de la convocatoria actual activa.

Criterios de aceptación:

1. Encabezado con los datos personales y académicos  
   1. Nombre y apellido  
   2. Cédula de identidad  
   3. Categoría  
   4. Dedicación  
   5. Último diploma  
   6. Número PPI  
   7. Número PEI  
   8. Grupos de investigación de los cuales es responsable  
   9. Departamento  
2. Poder descargar pdf del reporte si el período está activo  
3. Mostrar notificación si el período no está activo  
4. Mostrar el período de la convocatoria  
5. Mostrar fecha actual que se genera el reporte  
6. Listar todos los tipos de actividades dentro del período de la convocatoria con los autores e información  
7. Cantidad de actividades

## 0009 \- Como Profesor quiero poder consultar mis solicitudes S1 Novel para mantenerme informado del proceso en el que se encuentra

Descripción: Se muestra la lista de solicitudes S1 Novel realizadas y el estado del proceso en el que se encuentra.

Criterios de aceptación:

1. Listar solicitudes realizadas mostrando:  
   1. Profesor evaluador, nombre y correo  
   2. Fecha de la solicitud  
   3. Estado: “En Revisión”, “Aprobada”, “Rechazada”  
   4. Comentarios del profesor evaluador  
   5. Lista del jurado  
      1. Nombres  
      2. Ver/Descargar archivos del veredicto de cada jurado luego al estar Aprobada o Rechazada la solicitud  
2. Poder ver/descargar el archivo del proyecto y soportes

## 0010 \- Como Profesor quiero poder realizar solicitudes S1 Novel para ejecutar el proyecto de investigación

Descripción:Se crea la solicitud S1 Novel para realizar el proyecto de investigación.

Criterios de aceptación:

1. Poder adjuntar archivo de especificación del proyecto  
2. Poder adjuntar archivos como soporte, al menos 1  
3. Poder realizar observaciones de la solicitud  
4. Fecha de la solicitud

## 0011 \- Como Profesor quiero poder eliminar solicitudes S1 Novel para cancelar la solicitud

Descripción: Se elimina la solicitud S1 Novel realizada.

Criterios de aceptación:

1. Permitir eliminar si aún no se ha asignado jurado

## 0012 \- Como Profesor quiero poder consultar mis solicitudes PREPRAII para hacer seguimiento

Descripción: Se listan las solicitudes PREPRAII realizadas y el estado del proceso.

Criterios de aceptación:

1. Listar solicitudes con la información:  
   1. Nombre del artículo  
   2. Estado de la solicitud: “En Revisión”, “Aprobada”, “Rechazada”  
   3. Indicar si ha sido pagada o no  
   4. Tipo: 1 o 2  
   5. Indicar Monto si ha sido aprobada  
   6. Nombre, correo y comentarios del profesor evaluador

## 0013 \- Como Profesor quiero poder realizar solicitudes PREPRAII para financiar mi investigación

Descripción: Se crea la solicitud PREPRAII para el financiamiento de la investigación.

Criterios de aceptación:

1. Poder seleccionar el artículo cuya fecha de publicación está dentro de la fecha inicio y fin del PREPRAII  
2. Indicar el índice: "SCI Expanded", "AHCI", "SSCI", "SCOPUS", "SciELO", "Latindex catálogo 2.0"  
3. Adjuntar archivo del artículo  
4. Poder realizar observaciones  
5. Adjuntar contratos y constancias de los autores que son profesores de la universidad

## 0014 \- Como Profesor quiero poder iniciar sesión con mi USBID para utilizar el sistema

Descripción:

Criterios de aceptación:

1. Se inicia sesión a través del sistema de la DST  
2. Se mantiene la sesión activa con Cookies

## 0015 \- Como Profesor quiero poder cerrar sesión para salir del sistema

Descripción: Se cierra sesión del sistema y DST

Criterios de aceptación:

1. Se cierra sesión y se sale del sistema  
2. Se cierra sesión a través de la DST

# Historias rol Coordinador

## 0016 \- Como Coordinador quiero poder consultar el resumen de actividades de mí coordinación para llevar un control y seguimiento de las mismas

Descripción: Se muestra un resumen de las actividades de la coordinación con sus departamentos asociados a través de un conteo de las mismas

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año y por tipo de actividad, se muestra el total por cada tipo de actividad  
2. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema  
3. Ver misma tabla por cada departamento asociado  
4. Enlace para poder ir a consultar actividades de cada departamento

## 0017 \- Como Coordinador quiero poder consultar el resumen de actividades de los departamentos asociados para llevar un control y seguimiento de la producción de los profesores

Descripción: Se muestra un resumen de las actividades del departamento a través de un conteo de las mismas y por profesor

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año y por tipo de actividad, se muestra el total por cada tipo de actividad  
2. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema  
3. Ver tabla con el conteo de cada tipo de actividad por cada profesor asociado al departamento, se muestra el total de actividades por profesor. Enlace para ir a ver el resumen de actividades de cada profesor  
4. Ver tabla de profesores sin actividades y con un enlace poder enviarles un correo  
5. Ver cantidad de profesores con y sin actividades

## 0018 \- Como Coordinador quiero poder evaluar las solicitudes S1 Novel realizadas para tomar una decisión

Descripción: Se muestra la lista de solicitudes por evaluar para tomar la decisión respectiva

Criterios de aceptación:

1. Poder asignar jurado, ya sea profesor de la universidad o externo  
2. Aprobar o Rechazar luego de asignar jurado  
   1. Adjuntar veredicto de cada jurado  
   2. Escribir comentario al profesor solicitante  
   3. Escribir observaciones propias  
3. Listar solicitudes con la información:  
   1. Nombre del Profesor solicitante  
   2. Observaciones realizadas por el profesor solicitante  
   3. Ver/descargar archivo Proyecto  
   4. Ver/descargar soportes  
   5. Estado de la solicitud: “En Revisión”, “Aprobada”, “Rechazada”  
4. Un coordinador no puede evaluar su propia solicitud

## 0019 \- Como Coordinador quiero poder evaluar las solicitudes PREPRAII realizadas para tomar una decisión

Descripción: Se muestra la lista de solicitudes por evaluar para tomar la decisión respectiva

Criterios de aceptación:

1. Aprobar o Rechazar solicitudes de la convocatoria activa  
2. Indicar si una solicitud quedó en una convocatoria cerrada  
3. Seleccionar el tipo al tomar la decisión: 1 o 2  
4. El cálculo del monto se hace de forma automática:  
   1. Si tiene más de 1 autor: (monto tipo (1 o 2\) \* 2\) / cantidad de autores  
   2. Si es un solo autor: monto tipo (1 o 2\)  
5. Listar solicitudes con la información:  
   1. Profesor solicitante  
   2. Estado de la solicitud: “En Revisión”, “Aprobada”, “Rechazada”  
   3. Observaciones  
   4. Archivo del artículo  
   5. Contratos y constancias de los autores profesores de la universidad  
   6. Lista de autores de la universidad y externos  
   7. Detalles del artículo:  
      1. Revista donde se publicó  
      2. Fecha de publicación  
      3. Índice  
      4. Volúmen  
      5. Páginas inicial y final  
      6. Si es un artículo invitado  
      7. Si el artículo está publicado  
      8. Si es con estudiantes

## 0020 \- Como Coordinador quiero poder consultar los nuevos registros de profesores pendientes por validar para que se activen en el sistema y puedan ingresar

Descripción: Se visualiza la información de los profesores que se registraron en el sistema y esperan validación

Criterios de aceptación:

1. Poder validar o rechazar al profesor. El rechazo elimina el registro de la base de datos  
2. Lista de profesores con su información personal y académica  
   1. Nombre completo  
   2. Cédula de identidad  
   3. Correo  
   4. Departamento  
   5. Categoría  
   6. Condición  
   7. Dedicación  
   8. Último diploma  
   9. Universidad del diploma  
   10. Líneas de investigación  
   11. Página Web Personal (si tiene)  
   12. Perfiles Orcid, Google Schoolar y Researchgate  
       1. Id  
       2. Link del perfil

## 0021 \- Como Coordinador de Integración e Información quiero poder consultar la lista de los grupos de investigación para llevar el control de los integrantes y sus actividades

Descripción: Se muestra la lista de grupos de investigación junto con su información

Criterios de aceptación:

1. Listar grupos  
2. Mostrar nombre del grupo  
3. Mostrar nombre del jefe y sus integrantes  
4. Mostrar cantidad de integrantes  
5. Mostrar total de actividades del grupo  
6. Enlace para ir a ver el resumen de actividades de los miembros

## 0022 \- Como Coordinador de Integración e Información quiero poder consultar las actividades de investigación de todos los grupos de investigación para  hacer seguimiento de la producción de la coordinación

Descripción:

Criterios de aceptación:

1.

## 0023 \- Como Coordinador quiero poder filtrar las actividades para revisar de manera puntual las actividades

Descripción: Filtro de las actividades mostradas en la página

Criterios de aceptación:

1. Poder filtrar por rango de fecha  
2. Poder filtrar por tipo de actividad  
3. Se puede filtrar en el resumen de actividades de cada profesor, grupo y mi página personal

## 0025 \- Como Coordinador quiero poder validar cualquier actividad para corroborar su información

Descripción: Se valida la actividad

Criterios de aceptación:

1. Desde la lista de actividades tener la opción para validar la actividad  
2. Confirmar validación  
3. Revertir validación con confirmación

# Historias Jefe y Representante de Departamento

## 0026 \- Como Jefe y Representante de Departamento quiero poder consultar el resumen de actividades de mi departamento para tomar decisiones

Descripción: Se muestra un resumen de las actividades del departamento a través de un conteo de las mismas y por profesor

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año y por tipo de actividad, se muestra el total por cada tipo de actividad  
2. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema  
3. Ver tabla con el conteo de cada tipo de actividad por cada profesor asociado al departamento, se muestra el total de actividades por profesor. Enlace para ir a ver el resumen de actividades de cada profesor  
4. Ver tabla de profesores sin actividades y con un enlace poder enviarles un correo  
5. Ver cantidad de profesores con y sin actividades

## 0027 \- Como Jefe y Representante de Departamento quiero poder filtrar las actividades para visualizar solo las necesarias

Descripción: Filtro de las actividades mostradas en la página.

Criterios de aceptación:

1. Poder filtrar por rango de fecha  
2. Poder filtrar por tipo de actividad  
3. Se puede filtrar en el resumen de actividades de cada profesor, grupo y mi página personal

## 0028 \- Como Jefe y Representante de Departamento quiero poder validar cualquier actividad para rectificar la información ingresada

Descripción: Se valida la actividad

Criterios de aceptación:

1. Desde la lista de actividades tener la opción para validar la actividad  
2. Confirmar validación  
3. Revertir validación con confirmación

# Historias rol Jefe de División

## 0029 \- Como Jefe de División quiero poder consultar actividades de mi división para llevar un control y seguimiento de las mismas

Descripción: Se muestra un resumen de las actividades de la división con sus departamentos asociados a través de un conteo de las mismas

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año y por tipo de actividad, se muestra el total por cada tipo de actividad  
2. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema  
3. Ver misma tabla por cada departamento asociado  
4. Enlace para poder ir a consultar actividades de cada departamento

## 0030 \- Como Jefe de División quiero poder filtrar las actividades para organizar la información que quiero revisar

Descripción: Filtro de las actividades mostradas en la página.

Criterios de aceptación:

1. Poder filtrar por rango de fecha  
2. Poder filtrar por tipo de actividad  
3. Se puede filtrar en el resumen de actividades de cada profesor, grupo y mi página personal

## 0031 \- Como Jefe de División quiero poder consultar el resumen de actividades de los departamentos asociados para llevar un control y seguimiento de la producción de los profesores

Descripción: Se muestra un resumen de las actividades del departamento a través de un conteo de las mismas y por profesor

Criterios de aceptación:

1. Ver tabla con el conteo de actividades por año y por tipo de actividad, se muestra el total por cada tipo de actividad  
2. El año es en el cual se realizó la actividad, no el año en el cual se creó en el sistema  
3. Ver tabla con el conteo de cada tipo de actividad por cada profesor asociado al departamento, se muestra el total de actividades por profesor. Enlace para ir a ver el resumen de actividades de cada profesor  
4. Ver tabla de profesores sin actividades y con un enlace poder enviarles un correo  
5. Ver cantidad de profesores con y sin actividades

## 0032 \- Como Jefe de División quiero poder validar cualquier actividad para rectificar la información ingresada

Descripción: Se valida la actividad

Criterios de aceptación:

1. Desde la lista de actividades tener la opción para validar la actividad  
2. Confirmar validación  
3. Revertir validación con confirmación

# Historias rol Decano/Administrador

## 0033 \- Como Decano quiero poder modificar cualquier actividad para corregir y actualizar los datos

Descripción: Se modifican las actividades ya creadas en el sistema

Criterios de aceptación:

1. Desde la lista de actividades tener la opción para ir a modificar la actividad  
2. Se pueden modificar todos los campos

## 0034 \- Como Decano quiero poder validar cualquier actividad para constatar la información ingresada

Descripción: Se valida la actividad

Criterios de aceptación:

1. Desde la lista de actividades tener la opción para validar la actividad  
2. Confirmar validación  
3. Revertir validación con confirmación

## 0035 \- Como Decano quiero poder eliminar cualquier actividad para corregir y limpiar los datos

Descripción: Se eliminan las actividades ya creadas en el sistema

Criterios de aceptación:

1. Desde la lista de actividades tener la opción para eliminar la actividad  
2. Confirmar eliminación

## 0036 \- Como Decano quiero poder actualizar el período BRA para que los profesores se postulen

Descripción: Se actualiza la fecha del período y se activa o desactiva

Criterios de aceptación:

1. Modificar Fecha de inicio  
2. Modificar Fecha final  
3. Activar/Desactivar

## 0037 \- Como Decano quiero poder crear una nueva convocatoria PREPRAII para que los profesores puedan solicitar financiación

Descripción: Se crea una nueva convocatoria de financiación

Criterios de aceptación:

1. Indicar Fecha de inicio  
2. Indicar Fecha final  
3. Indicar Monto tipo 1  
4. Indicar Monto tipo 2  
5. Seleccionar si crearla activa o desactivada

## 0038 \- Como Decano quiero poder actualizar la convocatoria PREPRAII actual para que los profesores puedan postularse

Descripción: Se modifican los datos de la convocatoria

Criterios de aceptación:

1. Fecha de inicio  
2. Fecha final  
3. Monto tipo 1  
4. Monto tipo 2  
5. Activar/Desactivar

## 0039 \- Como Decano quiero poder consultar el histórico de solicitudes PREPRAII para tomar una decisión

Descripción: Se muestran las convocatorias cerradas y la actual

Criterios de aceptación:

1. Mostrar convocatoria actual  
2. Mostrar convocatorias de períodos cerrados anteriores  
3. Mostrar información:  
   1. Período de la convocatoria  
   2. Profesor solicitante  
   3. Evaluador  
   4. Título del artículo  
   5. Estado: “En Revisión”, “Aprobado”, “Rechazado”  
   6. Monto de la solicitud

## 0040 \- Como Decano quiero poder marcar como pagadas las solicitudes PREPRAII aprobadas para realizar contabilidad

Descripción: Se muestran las solicitudes aprobadas sin pagar

Criterios de aceptación:

1. Deben estar aprobadas  
2. Deben estar sin pagar  
3. Mostrar:  
   1. Profesor solicitante y evaluador  
   2. Título del artículo  
   3. Monto solicitado  
   4. Lista de coautores junto con sus contratos y constancias

## 0041 \- Como Decano quiero poder reasignar el coordinador evaluador de las solicitudes PREPRAII para evitar que sea el mismo profesor solicitante

Descripción: Se re-asigna el coordinador evaluador de la solicitud

Criterios de aceptación:

1. En la página del histórico de solicitudes aparece un botón para cambiar el evaluador si es el mismo profesor solicitante  
2. Aparece una ventana emergente con la lista de coordinadores para seleccionar al nuevo evaluador

## 0042 \- Como Decano quiero poder actualizar los coordinadores de cada coordinación para mantener al día los cargos de escalafón académico

Descripción: Lista de coordinaciones con su coordinador

Criterios de aceptación:

1. Nombre de la coordinación  
2. Nombre del coordinador  
3. Opción para modificar con la lista de profesores activos en el sistema

## 0043 \- Como Decano quiero poder actualizar la mesa técnica de todos los departamentos para mantener al día los cargos de escalafón académico

Descripción: Lista de departamentos con su jefe y representante

Criterios de aceptación:

1. Nombre del departamento  
2. Nombre del jefe y representante  
3. Opción para modificar con la lista de profesores activos en el sistema

## 0044 \- Como Decano quiero poder consultar los nuevos registros de profesores pendientes por validar para que se activen en el sistema y puedan ingresar

Descripción: Se visualiza la información de los profesores que se registraron en el sistema y esperan validación

Criterios de aceptación:

1. Poder validar o rechazar al profesor. El rechazo elimina el registro de la base de datos  
2. Lista de profesores con su información personal y académica  
   1. Nombre completo  
   2. Cédula de identidad  
   3. Correo  
   4. Departamento  
   5. Categoría  
   6. Condición  
   7. Dedicación  
   8. Último diploma  
   9. Universidad del diploma  
   10. Líneas de investigación  
   11. Página Web Personal (si tiene)  
   12. Perfiles Orcid, Google Schoolar y Research Gate  
       1. Id  
       2. Link del perfil

## 0045 \- Como Decano quiero poder consultar la lista de los grupos de investigación para tomar decisiones

Descripción:  Se muestra la lista de grupos de investigación junto con su información

Criterios de aceptación:

1. Listar grupos  
2. Mostrar nombre del grupo  
3. Mostrar nombre del jefe y sus integrantes  
4. Mostrar cantidad de integrantes  
5. Mostrar total de actividades del grupo  
6. Enlace para ir a ver el resumen de actividades de los miembros

## 0046 \- Como Decano quiero poder filtrar las actividades para organizar la información que quiero revisar

Descripción: Filtro de las actividades mostradas en la página.

Criterios de aceptación:

1. Poder filtrar por rango de fecha  
2. Poder filtrar por tipo de actividad  
3. Se puede filtrar en el resumen de actividades de cada profesor, grupo y mi página personal
