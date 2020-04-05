import App from './App.svelte';

const app = new App({
	target: document.body,
    props: {
        API_URL: 'https://reservations.coredump.ch/api/v1/',
        API_TOKEN: 'c3d8b0c98a9d6fba21a3ac0566e37a9b89e3b079',
    }
});

window.app = app;

export default app;
