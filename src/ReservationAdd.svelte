<script>
    import * as moment from 'moment'
    import { onMount } from 'svelte';

    import { createReservation } from './api';
    import ErrorList from './ErrorList.svelte';

    const DATE_FORMAT = 'Y-MM-DDTHH:mm';

    // Error handling
    let errorList;

    // Bound values
    let name;
    let start;
    let duration;

    // Reset bound values
    function resetFormFields() {
        name = '';
        start = moment().format(DATE_FORMAT);
        duration = 1;
    }
    resetFormFields();

    // Calculated start and end moments
    $: startMoment = moment(start);
    $: endMoment = moment(start).add(moment.duration({hours: duration}));

    // Form submission
    let success = false;
    async function handleSubmit(e) {
        console.info('Submitting form:');
        console.info(` Name: ${name}`);
        console.info(` Start: ${startMoment}`);
        console.info(` End: ${endMoment}`);
        try {
            // Create a new reservation through the API
            const response = await createReservation(
                name,
                startMoment.toDate(),
                endMoment.toDate(),
            );

            // Success, reset form fields
            success = true;
            resetFormFields();
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

{#if success}
<div class="alert alert-success">Reservation gespeichert!</div>
{/if}

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
