<script>
    import * as moment from 'moment'
    import 'moment-precise-range-plugin'; // Used for `moment().preciseDiff()` to work

    import { onMount } from 'svelte';

    import { getReservations }  from './api';

    export let API_URL;
    export let API_TOKEN;

    let reservations;

    function absoluteDate(m) {
        return m.format('DD.MM.YYYY HH:mm');
    }

    function relativeDate(m) {
        return m.fromNow();
    }

    function duration(start, end) {
        console.log('obj', moment().preciseDiff(start, end));
        return moment.preciseDiff(start, end);
    }

    onMount(async () => {
        const data = await getReservations(API_URL, API_TOKEN);
        reservations = data.map(res => {
            console.log('Reservation:', res);

            // Parse dates
            res.start = moment(res.start);
            res.end = moment(res.end);

            return res;
        });
    });
</script>

<style>
</style>

<h2>Aktive Reservationen</h2>

<div ng-include="'templates/errors.html'"></div>

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
        {#if reservations}
        <tr>
            {#each reservations as res}
                <td title="{absoluteDate(res.start)}">{relativeDate(res.start)}</td>
                <td>{duration(res.start, res.end)}</td>
                <td title="{absoluteDate(res.end)}">{relativeDate(res.end)}</td>
                <td>{res.owner}</td>
            {/each}
        </tr>
        {/if}
    </tbody>
</table>
