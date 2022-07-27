<!-- 
  @component
  Shows the departaments activities resume.
 -->
<script>
  import ResumeTable from "$components/resume_table.svelte";

  const headers =
    [ "Eventos en el Exterior"
    , "Eventos Nacionales"
    , "Proyectos"
    , "Memorias"
    , "Informes Tecnicos"
    , "Articulos"
    , "Libros"
    , "Capitulos"
    ];

  const acts_counts = Array(8).fill("activity kind count");
</script>

<!--  -->
En el manual pero no en el codigo actual
<div class="ui divider" />

<h2>El departamento de (dpto name) tiene en el sistema</h2>

<ResumeTable
  headers={["Actividad", "Anio1", "Anio1"]}
  acts_counts={acts_counts.slice(0,2)}
  resume_kinds={["act1", "act2"]}
  n_column="four column"
  row_total
/>

<div class="uk-text-center">
 <a href="">Vista BRA Departamental</a>
</div>

<div class="uk-text-center">
  Numero total de profesores de su departamento resgistrados en el sistema: (#)
</div>

<div class="uk-text-center">
  Nota: La suma de las actividades de los profesores no es igual al total del departamento,
  pues pueden tener varios autores.
</div>
<!--  -->

<div class="ui divider" />

<h2>Profesores con Actividades (#)</h2>
<div class="uk-text-center">
  Nota: A continuacion se muestran los totales de las actividades ingresadas en el sistema
  de cada profesor. Si desea ver mas detalles de las actividades de cada profesor haga
  click en su nombre.
</div>

<!-- TODO: #20 -->
<ResumeTable
  headers={["Profesor"].concat(headers)}
  {acts_counts}
  resume_kinds={["prof1", "prof2"]}
  n_column="nine column"
/>

<div class="ui divider" />

<h2>Profesores sin Actividades (#)</h2>

<!-- TODO: #20 -->
<ResumeTable
  headers={["Profesor"]}
  resume_kinds={["prof1", "prof2"]}
/>

<div class="ui divider" />

acts by year departamento? las q aparecen en la tabla arriba o
del prof q esta login?
