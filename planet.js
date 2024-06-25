let planetName;
let climate;
let gravity;
let population;
let terrain;
let diameter;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  planetName = document.querySelector('h1#planetName');
  climate = document.querySelector('span#climate');
  gravity = document.querySelector('span#gravity');
  population = document.querySelector('span#population');
  terrain = document.querySelector('span#terrain');
  diameter = document.querySelector('span#diameter')
  charactersList = document.querySelector('#characters>ul');
  filmsList = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.characters = await fetchCharacters(planet)
    planet.films = await fetchFilms(planet)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  console.log(planet);
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say planet name
  planetName.textContent = planet?.name;
  climate.textContent = planet?.climate;
  gravity.textContent = planet?.gravity;
  population.textContent = planet?.population;
  terrain.textContent = planet?.terrain;
  diameter.textContent = planet?.diameter;
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsList.innerHTML = filmsLis.join("");
  const charsLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersList.innerHTML = charsLis.join("");
}
