import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

import packageJson from './package.json';

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte()],
    define: {
        __APP_VERSION__: JSON.stringify(packageJson.version),
    },
});
