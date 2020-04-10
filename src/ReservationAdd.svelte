<script>
    import * as moment from 'moment'
    import { onMount } from 'svelte';

    import { createReservation } from './api';
    import ErrorList from './ErrorList.svelte';

    export let API_URL;
    export let API_TOKEN;

    const DATE_FORMAT = 'Y-MM-DD HH:mm';

    // Error handling
    let errorList;

    // Set initial values
    let name = '';
    let start = moment().format(DATE_FORMAT);
    let duration = 1;

    // Calculated start and end moments
    $: startMoment = moment(start);
    $: endMoment = moment(start).add(moment.duration({hours: duration}));

    async function handleSubmit(e) {
        console.info('Submitting form:');
        console.info(` Name: ${name}`);
        console.info(` Start: ${startMoment}`);
        console.info(` End: ${endMoment}`);
        try {
            const response = await createReservation(
                name,
                startMoment.toDate(),
                endMoment.toDate(),
                API_URL,
                API_TOKEN,
            );
        } catch (e) {
            console.error(e);
            if (e.responseData && e.responseData['non_field_errors']) {
                errorList.addError(
                    `HTTP ${e.statusCode}`,
                    e.responseData['non_field_errors'].join(' / '),
                );
            } else {
                errorList.addError(
                    'Unbekannter Fehler',
                    `Reservation konnte nicht gespeichert werden (${e.message})`,
                );
            }
        }
    }
</script>

<style>
    .form-group.invalid input {
        border-color: red;
    }
</style>

<h2>Neue Reservation</h2>

<ErrorList bind:this={errorList} />

<form class="form" role="form" on:submit|preventDefault="{handleSubmit}">
    <div class="form-group">
        <label for="name" class="control-label">Name</label>
        <input id="name" class="form-control" placeholder="Dein Name" bind:value="{name}" required>
    </div>
    <div class="form-group" class:invalid="{start.length < 16 || !startMoment.isValid()}">
        <label for="start" class="control-label">Beginn</label>
        <input id="start" class="form-control" type="datetime-local" bind:value="{start}" required>
    </div>
    <div class="form-group" class:invalid="{!duration}">
        <label for="duration" class="control-label">Dauer (h)</label>
        <input id="duration" class="form-control" type="number" min="0" max="48" step="0.25" bind:value="{duration}" required>
    </div>
    <div class="form-group">
        <button class="btn btn-primary">Go!</button>
    </div>
</form>
