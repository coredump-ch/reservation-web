import {DateTime} from 'luxon';

import {writable} from 'svelte/store';

import {RequestFailed} from './errors';

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

/**
 * Wrap a writable store and fetch the current reservation list.
 *
 * Provide methods to update the reservations.
 */
class Api {
    constructor() {
        const {subscribe, set, update} = writable({
            // Whether the data is currently being updated
            updating: false,
            // An error message if loading failed
            error: null,
            // The list of reservations
            data: [],
        });
        this.subscribe = subscribe;
        this._set = set;
        this._update = update;

        // Load initial data
        this.update();
    }

    /**
     * Load the reservations from the API.
     */
    async update() {
        this._update((store) => {
            store.updating = true;
            return store;
        });
        try {
            let data = await getReservations();
            console.debug(`Fetched ${data.length} reservations:`, data);
            this._update((store) => {
                store.updating = false;
                store.error = null;
                store.data = data;
                return store;
            });
        } catch (e) {
            console.error('Fetching failed:', e);
            this._update((store) => {
                store.updating = false;
                store.error = e.message;
                return store;
            });
        }
    }

    clear() {
        this._set([]);
    }
}

export const reservations = new Api();

/**
 * Fetch reservations from the API.
 */
export async function getReservations() {
    const res = await fetch(`${API_URL}reservations/`, {
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            Authorization: `Token ${API_TOKEN}`,
            Accept: 'application/json',
        },
    });
    if (res.status !== 200) {
        throw new Error(`"HTTP ${res.status} ${res.statusText}" when fetching reservations`);
    }
    const data = await res.json();
    return data.results.map((res) => {
        // Parse dates
        res.start = DateTime.fromISO(res.start);
        res.end = DateTime.fromISO(res.end);
        return res;
    });
}

/**
 * Create a new reservation through the API.
 *
 * @param name (string): The person who creates the reservation
 * @param printer (string): ID of the desired printer
 * @param start (Date): Start datetime
 * @param end (Date): End datetime
 * @throws RequestFailed if response does not return successfully
 */
export async function createReservation(name, printer, start, end) {
    const res = await fetch(`${API_URL}reservations/`, {
        method: 'post',
        headers: {
            'Authorization': `Token ${API_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner: name,
            printer,
            start: start.toISOString(),
            end: end.toISOString(),
        }),
    });
    if (!res.ok) {
        let data = undefined;
        try {
            data = await res.json();
        } catch (e) {
            /* ignore */
        }
        throw new RequestFailed('Could not create reservation', res.status, data);
    }
    return await res.json();
}
