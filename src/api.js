import * as moment from 'moment'

import { writable } from 'svelte/store';

import { RequestFailed } from './errors';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

/**
 * Wrap a writable store and fetch the current reservation list.
 *
 * Provide methods to update the reservations.
 */
class Api {
    constructor() {
        const { subscribe, set, update } = writable([]);
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
        let data = await getReservations();
        console.debug(`Fetched ${data.length} reservations:`, data);
        this._set(data);
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
            'Authorization': `Token ${API_TOKEN}`,
            'Accept': 'application/json',
        },
    });
    const data = await res.json();
    return data.results.map(res => {
        // Parse dates
        res.start = moment(res.start);
        res.end = moment(res.end);
        return res;
    });
}

/**
 * Create a new reservation through the API.
 *
 * @param name (string): The person who creates the reservation
 * @param start (Date): Start datetime
 * @param end (Date): End datetime
 * @throws RequestFailed if response does not return successfully
 */
export async function createReservation(name, start, end) {
    const res = await fetch(`${API_URL}reservations/`, {
        method: 'post',
        headers: {
            'Authorization': `Token ${API_TOKEN}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            owner: name,
            start: start.toISOString(),
            end: end.toISOString(),
        }),
    });
    if (!res.ok) {
        let data = undefined;
        try {
            data = await res.json();
        } catch { }
        throw new RequestFailed('Could not create reservation', res.status, data);
    }
    return await res.json();
}
