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

<h2>Profesores con Actividades (#)</h2>
<div class="uk-text-center">
  Nota: A continuacion se muestran los totales de las actividades ingresadas en el sistema
  de cada profesor. Si desea ver mas detalles de las actividades de cada profesor haga
  click en su nombre.
</div>

<!-- TODO: #20 -->
<ResumeTable
  headers={["Profesor"].concat(headers)}
  resume_kinds={["prof1", "prof2"]}
  {acts_counts}
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

acts by year coordinacion? las q aparecen en la tabla arriba o
del coordinador?

<div class="ui divider" />

<h2>Grupos con Actividades (#)</h2>

<!-- TODO: #20 -->
<ResumeTable
  headers={["Grupo"].concat(headers)}
  {acts_counts}
  resume_kinds={["GID1", "GID2"]}
  n_column="ten column"
  row_total
/>

<div class="ui divider" />

<h2>Grupos sin Actividades (#)</h2>

<!-- TODO: #20 -->
<ResumeTable
  headers={["Grupo"]}
  resume_kinds={["GID1", "GID2"]}
/>
