<script lang="ts">
  import type { ActivitiesCounts } from "$types/db/activities";

  export let headers: string[] = [];
  export let resume_kinds_counts: ActivitiesCounts[] = [];
  export let collapsing: boolean = false;
  export let row_total: boolean = false;
  export let col_total: boolean = false;
  
  const n_column: string = `${headers.length} column`;

  const zip = function (...arrays: any[]) {
    const length = Math.max(...arrays.map(array => array.length));
    return Array.from({ length }, (_, i) => arrays.map(array => array[i]));
  };

  const sum = function (numbers: number[]) {
    return numbers.reduce((sum, number) => sum + number, 0);
  };

  const resume_total_counts = zip(...resume_kinds_counts.map(c => c.counts)).map(sum);
</script>

<!-- TODO: 'sortable' not work -->
<div id="resume_table" class="uk-margin uk-overflow-auto"> <!-- class="uk-overflow-auto"> <<- si se coloca no puedo colocar 'ui'  -->
  <table class="ui {n_column} celled striped small table">
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
          <td class="{collapsing ? "uk-text-center" : ''}">
            {#if a.link}
              <a href={a.link}>
                {a.kind}
              </a>
            {:else}
              {a.kind}
            {/if}
          </td>
          {#each a.counts as count}
            <td class="center aligned">{count}</td>
          {/each}
          {#if row_total}
            <td class="grey center aligned">
              <i>{ a.counts.reduce( (accum, count) => accum + count, 0 ) }</i>
            </td>
          {/if}
        </tr>
      {/each}
      {#if col_total}
        <tr class="grey center aligned">
          <td>
            <strong><i>Total</i></strong>
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
