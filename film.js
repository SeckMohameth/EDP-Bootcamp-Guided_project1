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
    title = document.querySelector('title');
    episode = document.querySelector('episode');
    director = document.querySelector('span#director');
    opening_crawl = document.querySelector('span#openiong_crawl');
    producer = document.querySelector('span#produceer');
    release = document.querySelector('span#release');
    charactersList = document.querySelector('#characters>ul');
    planetsList = document.querySelector('#planets>ul');

        
    // reading the film ID from query search - search params
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    getFilms(id);
  });




async function getFilms(id) {
    let film;
    try {
        film = await fetchFilms(id);
        film.characters = await fetchCharacters(id);
        film.planets = await fetchPlanets(id);
    
    } catch(err) {
        console.log(error)
    }
    renderFilm(film)
}
   

    async function fetchCharacters(id) {
        let characterUrl = `${baseUrl}/films/${id}/characters`;
        return await fetch(characterUrl)
          .then(res => res.json())
      }
      
      async function fetchPlanets(id) {
        const url = `${baseUrl}/films/${id}/planets`;
        const planets = await fetch(url)
          .then(res => res.json())
        return planets;
      }
      
      async function fetchFilms(id) {
        const url = `${baseUrl}/films/${id}`;
        const films = await fetch(url)
          .then(res => res.json())
        return films;
      }





const renderFilm = film => {
    console.log(film); // see data in console
    document.title = `SWAPI - ${film?.title}`;  
  const charsLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersList.innerHTML = charsLis.join("");
  const planetsLis = film?.planets?.map(planet => `<li><a href="/film.html?id=${planet.id}">${planet.name}</li>`)
  planetsList.innerHTML = planetsLis.join("");
  }



