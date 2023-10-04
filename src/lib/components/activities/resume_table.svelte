<!-- 
	@component
  Kinds activities count resume table

  * `headers`: string[]
  * `resume_kinds_counts`: ActivitiesCounts[]
  * `links`: boolean (optional)
  * `collapsing`: boolean (optional)
  * `row_total`: boolean (optional)
  * `col_total`: boolean (optional)
  * 
 -->
<script lang="ts">
  import type { ActivitiesCounts } from "$lib/interfaces/activities";

  export let headers: string[];
  export let resume_kinds_counts: ActivitiesCounts[];
  export let links: boolean = false;
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

  const resume_total_counts = zip(...resume_kinds_counts.map(ac => ac.counts.map(c => c.count))).map(sum);
</script>

<!-- class="uk-overflow-auto" not compatible with fomantic ui -->
<div id="resume_table" class="uk-margin uk-overflow-auto">
  <table class="ui {n_column} celled striped small table">
    <thead class="center aligned">
      <tr>
        {#each headers as header}
          <th>
            {#if links && header!=="Actividad"}
              <a href="#{header}_activities">{header}</a>
            {:else}
              {header}
            {/if}
          </th>
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
          {#each a.counts as c}
            <td class="center aligned">
              {#if links && c.count > 0}
                <a href="#{c.year}_{a.kind}">{c.count}</a>
              {:else}
                {c.count}
              {/if}
            </td>
          {/each}
          {#if row_total}
            <td class="grey center aligned">
              <i>{ a.counts.map(c => c.count).reduce( (accum, count) => accum + count, 0 ) }</i>
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
