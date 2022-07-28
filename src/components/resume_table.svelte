<script lang="ts">
  export let headers: string[] = [];
  export let resume_kinds: string[] = [];
  export let acts_counts: any[] = [];
  export let n_column: string = "";
  export let row_total: boolean = false;
  export let col_total: boolean = false;
</script>

<!-- TODO: 'sortable' not work -->
<div id="resume_table"> <!-- class="uk-overflow-auto"> <<- si se coloca no puedo colocar 'ui'  -->
  <table class="ui {n_column} celled striped table uk-table">
    <thead class="center aligned">
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
        {#if row_total}
          <th><i>Total</i></th>
        {/if}
      </tr>
    </thead>
    <tbody class="center aligned">
      {#each resume_kinds as kind}      
        <tr>
          <td>
            <a href="#">{kind}</a>
          </td>
          {#each acts_counts as count}
            <td>{count}</td>
          {/each}
          {#if row_total}
            <td><i>row total</i></td>
          {/if}
        </tr>
      {/each}
      {#if col_total}
        <tr>
          <td class="grey"><i>Total</i></td>
          {#each acts_counts as count}
            <td>{count}</td>
          {/each}
          <td class="center aligned"><strong>column total count</strong></td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
