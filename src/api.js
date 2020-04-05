/**
 * Fetch reservations from the API.
 */
export async function getReservations(API_URL, API_TOKEN) {
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
