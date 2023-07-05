let worker = 'https://withered-wind-95c4.mrkoko134.workers.dev';

async function getRatings() {
	let response = await fetch(worker);
	let json = await response.json();

	return json;
}
