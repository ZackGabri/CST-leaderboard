export async function getRatings() {
	const response = await fetch('/getratings');
	const json = await response.json();

	return json
}