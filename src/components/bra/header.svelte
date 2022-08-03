<script>
	import { user } from '$lib/shared/stores/session';
  import { format_date } from '$utils/frontend';

  export let period = '';

  const profile = $user.profesor_profile;
  const current_date = format_date(new Date(), true);
</script>

<div id="bra_header" class="uk-margin">
  <h1 class="ui blue header uk-text-center">
    Sistema de Información de Actividades de Investigación - SINAI
  </h1>
  
  <div class="ui divider" />
  
  <div class="ui centered grid container">
    <div class="three column row">
      <div class="column"><strong>Profesor:</strong> {profile.name1 + ' ' + profile.surname1}</div>
      <div class="column"><strong>Cédula:</strong> {profile.id_card}</div>
      <div class="column"><strong>Vista:</strong>	Bono BRA</div>
    </div>
  
    <div class="four column row">
      <div class="column"><strong>Categoría:</strong> {profile.category}</div>
      <div class="column"><strong>Dedicación:</strong>	{profile.dedication}</div>
      <div class="column"><strong>Último Diploma:</strong>	{profile.diploma}</div>
      <div class="column"><strong>Num. PPI:</strong> {profile.ppi_number}</div>
    </div>
  
    <div class="one column row">
      <div class="column"><strong>Grupos de Investigación:</strong> {profile.groups.join(". ")}</div>
    </div>
  </div>
  
  <div class="ui divider" />
  
  <div class="ui centered grid container">
    <div class="two column row">
      <div class="column"><strong>Departamento:</strong> {profile.department_name}</div>
      <div class="column"><strong>Tipo de Actividad:</strong> TODAS</div>
    </div>
  
    <div class="two column row">
      <div class="column"><strong>Período:</strong> {period}</div>
      <div class="column"><strong>Fecha Actual:</strong> {current_date}</div>
    </div>
  </div>

  <div class="ui divider" />
</div>
