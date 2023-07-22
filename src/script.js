/**
 *  Returns an array containing all the players ratings as objects
 * @returns {Object[]}
 */
export async function getRatings() {
  const response = await fetch('/getratings');
  const json = await response.json();

  return json;
}
