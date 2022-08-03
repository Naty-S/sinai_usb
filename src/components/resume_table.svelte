<script lang="ts">
  import type { ActivitiesCounts } from "$types/db/activities";

  export let headers: string[] = [];
  export let resume_kinds_counts: ActivitiesCounts[] = [];
  export let n_column: string = '';
  export let row_total: boolean = false;
  export let col_total: boolean = false;

  const zip = function (...arrays: any[]) {
    const length = Math.max(...arrays.map(array => array.length));
    return Array.from({ length }, (_, i) => arrays.map(array => array[i]));
  };

  const sum = function (numbers: number[]) {
    return numbers.reduce((sum, number) => sum + number, 0);
  };

  const resume_total_counts = zip(...resume_kinds_counts.map(c => c.years_counts)).map(sum);
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
    <tbody>
      {#each resume_kinds_counts as a}
        <tr>
          <td>
            <!-- <a href="#"> -->
              {a.kind}
            <!-- </a> -->
          </td>
          {#each a.years_counts as count}
            <td class="center aligned">{count}</td>
          {/each}
          {#if row_total}
            <td class="center aligned">
              <i>{ a.years_counts.reduce( (accum, count) => accum + count, 0 ) }</i>
            </td>
          {/if}
        </tr>
      {/each}
      {#if col_total}
        <tr class="center aligned">
          <td class="grey">
            <i>Total</i>
          </td>
          {#each resume_total_counts as count}
            <td>{count}</td>
          {/each}
          <td>
            <strong>{ resume_total_counts.reduce( (accum, count) => accum + count, 0 ) }</strong>
          </td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
