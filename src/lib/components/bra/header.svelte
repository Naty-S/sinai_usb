<!-- 
	@component
  Header for BRA page
 -->
<script lang="ts">
  import type { profesor } from "@prisma/client";

  import { session } from "$app/stores";

  import { format_date } from "$lib/utils/formatting";

  export let profile: profesor;
  export let period = '';

  const current_date = format_date(new Date(), "long-day");
  
  $: professor = $session.user?.professor;
</script>

<div id="bra_header" class="uk-margin">
  <h1 class="ui blue header uk-text-center">
    Sistema de Información de Actividades de Investigación - SINAI
  </h1>
  
  <div class="ui divider" />
  
  <div class="ui centered grid container">
    <div class="three column row">
      <div class="column"><strong>Profesor:</strong> {professor?.name1} {professor?.surname1}</div>
      <div class="column"><strong>Cédula:</strong> {professor?.id_card}</div>
      <div class="column"><strong>Vista:</strong> Bono BRA</div>
    </div>
  
    <div class="three column row">
      <div class="column"><strong>Categoría:</strong> {profile.categoria}</div>
      <div class="column"><strong>Dedicación:</strong> {profile.dedicacion}</div>
      <div class="column"><strong>Último Diploma:</strong> {profile.diploma_tipo}</div>
    </div>
    
    <div class="two column row">
      <div class="column"><strong>Num. PPI:</strong> {professor?.ppi_number}</div>
      <div class="column"><strong>Num. PEI:</strong> {professor?.pei_number}</div>
    </div>

    <div class="one column row">
      <div class="column"><strong>Responsable de los Grupos de Investigación:</strong>
        {professor?.groups.grupos_investigacion.map(g => g.nombre).join(". ")}
      </div>
    </div>
  </div>
  
  <div class="ui divider" />
  
  <div class="ui centered grid container">
    <div class="two column row">
      <div class="column"><strong>Departamento:</strong> {professor?.department.name}</div>
      <div class="column"><strong>Tipo de Actividad:</strong> TODAS</div>
    </div>
  
    <div class="two column row">
      <div class="column"><strong>Período:</strong> {period}</div>
      <div class="column"><strong>Fecha Actual:</strong> {current_date}</div>
    </div>
  </div>

  <div class="ui divider" />
</div>
