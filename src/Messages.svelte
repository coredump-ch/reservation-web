<script>
    import { slide } from 'svelte/transition';

    // Messages. Key is an integer, value is an object:
    //
    // interface Value {
    //   name?: str,
    //   level: 'success' | 'error',
    //   msg: str,
    // }
    let messages = {};

    let i = 0;

    /**
     * Add a message.
     */
    export function addMessage(msg, timeout) {
        addGeneric({level: 'success', msg: msg}, timeout);
    }

    /**
     * Add an error.
     */
    export function addError(name, msg, timeout) {
        addGeneric({level: 'error', name: name, msg: msg}, timeout);
    }

    function addGeneric(obj, timeout) {
        const key = ++i;
        messages[key] = obj;
        if (timeout !== undefined) {
            setTimeout(() => {
                delete messages[key];
                messages = messages;
            }, timeout);
        }
    }
</script>

{#each [...Object.values(messages)] as message}
    <p class="alert" class:alert-success="{message.level === 'success'}" class:alert-danger="{message.level === 'error'}" transition:slide>
        {#if message.level === 'error'}
        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;
        {/if}
        {#if message.name !== undefined}
        <strong>{message.name}</strong>:
        {/if}
        {message.msg}
    </p>
{/each}
