<script>
    import * as moment from 'moment'

    const DATE_FORMAT = 'Y-MM-DD HH:mm';

    // Set initial values
    let owner = '';
    let start = moment().format(DATE_FORMAT);
    let duration = 1;

    // Calculated start and end moments
    $: startMoment = moment(start);
    $: endMoment = moment(start).add(moment.duration({hours: duration}));
</script>

<style>
</style>

<h2>Neue Reservation</h2>

<form class="form" role="form">
    <div class="form-group">
        <label for="owner" class="control-label">Name</label>
        <input id="owner" class="form-control" placeholder="Dein Name" bind:value="{owner}">
    </div>
    <div class="form-group">
        <label for="start" class="control-label">Beginn</label>
        <input id="start" class="form-control" type="datetime-local" bind:value="{start}">
    </div>
    <div class="form-group">
        <label for="duration" class="control-label">Dauer (h)</label>
        <input id="duration" class="form-control" type="number" min="0" max="48" step="0.25" bind:value="{duration}">
    </div>
    <div class="form-group">
        <button class="btn btn-primary">Go!</button>
    </div>
</form>
