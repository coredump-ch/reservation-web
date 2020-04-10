<script>
    export let errors = [];

    /**
     * Add an error to the error list.
     */
    export function addError(name, msg) {
        errors = [...errors, {name: name, msg: msg}];
    }
</script>

<style>
</style>

{#each errors as error}
    <p class="alert alert-danger">
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;
        <strong>{error.name}</strong>: {error.msg}
    </p>
{/each}
