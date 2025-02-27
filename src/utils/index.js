// async function cFetch(URL) {
//   try {
//     const response = await fetch(URL);
//     return await response.json();
//   } catch (error) {
//     console.log("error", error);
//     return null;
//   }
// }

// function getIDPokemon(url) {
//   const parts = url.split("/");
//   return parseInt(parts[parts.length - 2], 10);
// }
export function getIDPokemon(url) {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2], 10);
}
export const fetchAPI = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
