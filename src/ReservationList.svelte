<script>
    import * as moment from 'moment';
    import 'moment-precise-range-plugin'; // Used for `moment().preciseDiff()` to work

    import { reservations }  from './api';

    function absoluteDate(m) {
        return m.format('DD.MM.YYYY HH:mm');
    }

    function relativeDate(m) {
        return m.fromNow();
    }

    function duration(start, end) {
        return moment.preciseDiff(start, end);
    }
</script>

<style>
</style>

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
            <tr><td colspan="4"><em>Reservationsliste konnte nicht geladen werden! ({$reservations.error})</em></td></tr>
        {:else if $reservations.data.length > 0}
            {#each $reservations.data as res}
                <tr>
                    <td title="{absoluteDate(res.start)}">{relativeDate(res.start)}</td>
                    <td>{duration(res.start, res.end)}</td>
                    <td title="{absoluteDate(res.end)}">{relativeDate(res.end)}</td>
                    <td>{res.owner}</td>
                </tr>
            {/each}
        {:else}
            <tr><td colspan="4"><em>Keine aktiven oder geplanten Reservationen!</em></td></tr>
        {/if}
    </tbody>
</table>
