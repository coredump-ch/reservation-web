import { RequestFailed } from './errors';

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;

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
    return data.results;
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
