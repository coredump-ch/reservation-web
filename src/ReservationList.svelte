<script>
  import {Duration} from 'luxon';

  import {reservations} from './api';

  function absoluteDate(dateTime) {
    return dateTime.toFormat('dd.MM.yyyy HH:mm');
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

  function printerIdToName(printerId) {
    switch (printerId) {
      case 'ultimaker2+':
        return 'Ultimaker 2+';
      case 'prusaxl':
        return 'Prusa XL';
      case 'elegoo-mars':
        return 'Elegoo Mars';
      case 'elegoo-saturn-4ultra':
        return 'Elegoo Saturn 4 Ultra';
      default:
        console.warn(`Unknown printer model: ${printerId}`);
        return printerId;
    }
  }
</script>

<h2>Aktive Reservationen</h2>

<table class="table table-striped table-hover">
  <thead>
    <tr>
      <th>Modell</th>
      <th>Start</th>
      <th>Dauer</th>
      <th>Ende</th>
      <th>Name</th>
    </tr>
  </thead>

  <tbody>
    {#if $reservations.updating}
      <tr><td colspan="5"><em>Laden...</em></td></tr>
    {:else if $reservations.error !== null}
      <tr>
        <td colspan="5">
          <em>Reservationsliste konnte nicht geladen werden! ({$reservations.error})</em>
        </td>
      </tr>
    {:else if $reservations.data.length > 0}
      {#each $reservations.data as res}
        <tr>
          <td>{printerIdToName(res.printer)}</td>
          <td title={absoluteDate(res.start)}>{relativeDate(res.start)}</td>
          <td>{duration(res.start, res.end)}</td>
          <td title={absoluteDate(res.end)}>{relativeDate(res.end)}</td>
          <td>{res.owner}</td>
        </tr>
      {/each}
    {:else}
      <tr>
        <td colspan="5">
          <em>Keine aktiven oder geplanten Reservationen!</em>
        </td>
      </tr>
    {/if}
  </tbody>
</table>

<style>
</style>
