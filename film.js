let title;
let episode;
let director;
let opening_crawl;
let producer;
let release;
let characterList;
let planetList;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  title = document.querySelector('span#title');
  episode = document.querySelector('span#episode');
  director = document.querySelector('span#director');
  opening_crawl = document.querySelector('span#opening_crawl');
  producer = document.querySelector('span#producer');
  release = document.querySelector('span#release');
  characterList = document.querySelector('#characters>ul');
  planetsList = document.querySelector('#planets>ul');

  // reading the film ID from query search - search params
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get('id');
  getFilms(id);
})

async function getFilms(id) {
  let film;
  try {
    film = await fetchFilms(id);
    film.characters = await fetchCharacters(id);
    film.planets = await fetchPlanets(id);
  } catch (err) {
    console.log(error);
  }
  renderFilm(film);
}

async function fetchCharacters(id) {
  let characterUrl = `${baseUrl}/films/${id}/characters`;
  return await fetch(characterUrl)
    .then(res => res.json());
}

async function fetchPlanets(id) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json());
  return planets;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/films/${id}`;
  const films = await fetch(url)
    .then(res => res.json());
  return films;
}

const renderFilm = film => {
  console.log(film); // see data in console

  document.title = `SWAPI - ${film?.title}`;
  title.textContent = film?.title;
  episode.textContent = film?.episode_id;
  director.textContent = film?.director;
  producer.textContent = film?.producer;
  release.textContent = film?.release_date;
  opening_crawl.textContent = film?.opening_crawl;
  const charsLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`);
  characterList.innerHTML = charsLis.join("");
  const planetsLis = film?.planets?.map(planet => `<li><a href="/film.html?id=${planet.id}">${planet.name}</li>`);
  planetsList.innerHTML = planetsLis.join("");
}