<script>
  import {Duration} from 'luxon';

  import {reservations} from './api';

  function absoluteDate(dateTime) {
    return dateTime.toFormat('DD.MM.yyyy HH:mm');
  }

  function relativeDate(dateTime) {
    return dateTime.toRelative();
  }

  function duration(start, end) {
    const durationObject = end.diff(start, ['days', 'hours', 'minutes']).toObject();
    const filteredDurationObject = Object.fromEntries(
      Object.entries(durationObject).filter(([_, value]) => value !== 0),
    );
    return Duration.fromObject(filteredDurationObject).toHuman();
  }
</script>

<h2>Aktive Reservationen</h2>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Start</th>
      <th>Dauer</th>
      <th>Ende</th>
      <th>Name</th>
    </tr>
  </thead>

  <tbody>
    {#if $reservations.updating}
      <tr><td colspan="4"><em>Laden...</em></td></tr>
    {:else if $reservations.error !== null}
      <tr>
        <td colspan="4">
          <em>Reservationsliste konnte nicht geladen werden! ({$reservations.error})</em>
        </td>
      </tr>
    {:else if $reservations.data.length > 0}
      {#each $reservations.data as res}
        <tr>
          <td title={absoluteDate(res.start)}>{relativeDate(res.start)}</td>
          <td>{duration(res.start, res.end)}</td>
          <td title={absoluteDate(res.end)}>{relativeDate(res.end)}</td>
          <td>{res.owner}</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="4">
          <em>Keine aktiven oder geplanten Reservationen!</em>
        </td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
</style>
