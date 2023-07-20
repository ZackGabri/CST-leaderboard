async function getRatings() {
	let response = await fetch('/getratings');
	let json = await response.json();

	return json;
}