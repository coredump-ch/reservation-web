<script>
    import * as moment from 'moment'
    import 'moment-precise-range-plugin'; // Used for `moment().preciseDiff()` to work

    import { getReservations }  from './api';

    function absoluteDate(m) {
        return m.format('DD.MM.YYYY HH:mm');
    }

    function relativeDate(m) {
        return m.fromNow();
    }

    function duration(start, end) {
        return moment.preciseDiff(start, end);
    }

    let reservationsPromise = getReservations()
        .then(reservations => reservations.map(res => {
            console.log('Reservation:', res);
            // Parse dates
            res.start = moment(res.start);
            res.end = moment(res.end);
            return res;
        }));
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
        {#await reservationsPromise}
            <tr><td colspan="4"><em>Laden...</em></td></tr>
        {:then reservations}
            {#if reservations.length > 0}
                {#each reservations as res}
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
        {:catch error}
        <tr><td colspan="4"><em>Reservationsliste konnte nicht geladen werden! ({error})</em></td></tr>
        {/await}
    </tbody>
</table>
