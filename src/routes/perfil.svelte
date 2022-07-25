<script>
  import { pei_nivel_enum, profesor_categoria_enum, profesor_dedicacion_enum, profesor_diploma_tipo_enum } from "@prisma/client";

</script>
<h2 class="uk-text-center">
  Datos Personales
</h2>

<div class="ui divider" />

<div class="ui large form">

  <div class="ui centered grid container">
    <div class="two column row">
      <div class="column">Nombre: </div>
      <div class="column">Segundo Nombre: </div>
    </div>

    <div class="two column row">
      <div class="column">Apellido: </div>
      <div class="column">Segundo Apellido: </div>
    </div>
  </div>

  <div class="two inline fields">
    <div class="required field">
      <label for="">Perfil</label>
      <input type="text">
    </div>
    <div class="field">
      <label for="">Página url</label>
      <input type="text">
    </div>
  </div>

</div>

<div class="ui divider" />

<h2 class="uk-text-center">
  Datos Académicos
</h2>

<div class="ui divider" />

<div class="ui large form">

  <div class="two inline fields">
    <div class="field">
      <label for="categoria">Categoría</label>
      <select name="" id="categoria" class="ui selection dropdown">
        {#each Object.entries(profesor_categoria_enum) as [_, cat]}
          <option value={cat}>{cat}</option>
        {/each}
      </select>
    </div>

    <div class="field">
      <label for="dedicacion">Dedicación</label>
      <select name="" id="dedicacion" class="ui selection dropdown">
        {#each Object.entries(profesor_dedicacion_enum) as [_, ded]}
          <option value={ded}>{ded}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="ui centered grid container">
    <div class="one column row">
      <div class="column">Grupos de Investigación: </div>
    </div>

    <div class="one column row">
      <div class="column">Departamento: </div>
    </div>
  </div>

  <div class="three inline fields">
    <div class="field">
      <label for="">Número del PEI</label>
      <input type="text">
    </div>

    <div class="field">
      <label for="">Nivel</label>
      <select name="" id="diploma" class="ui selection dropdown">
        <option value=""></option>
        {#each Object.entries(pei_nivel_enum) as [_, pei]}
          <option value={pei}>{pei}</option>
        {/each}
      </select>
    </div>

    <div class="field">
      <label for="">Año Convocatoria</label>
      <input type="number">
    </div>
  </div>

  <div class="two inline required fields">
    <div class="six wide field">
      <label for="">Último Diploma</label>
      <select name="" id="diploma" class="ui selection dropdown">
        {#each Object.entries(profesor_diploma_tipo_enum) as [_, di]}
          <option value={di}>{di}</option>
        {/each}
      </select>
    </div>

    <div class="ten wide field">
      <label for="">Universidad del Diploma</label>
      <input type="text">
    </div>
  </div>

  <div class="required field">
    <label for="">Líneas de Investigación</label>
    <!-- TODO: #8 -->
    <input type="text">
  </div>

</div>
