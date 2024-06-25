let title;
let episode;
let director;
let opening_crawl;
let producer;
let release;

const baseUrl = `https://swapi2.azurewebsites.net/api`;


// Runs on page load
addEventListener('DOMContentLoaded', () => {
    title = document.querySelector('span#title');
    episode = document.querySelector('span#episode');
    director = document.querySelector('span#director');
    opening_crawl = document.querySelector('span#openiong_crawl');
    producer = document.querySelector('span#producer');
    release = document.querySelector('span#release');

        
    // reading the film ID from query search - search params
    const sp = new URLSearchParams(window.location.search);
    const id = sp.get('id');
    getFilms(id)
  });




async function getFilms(id) {
    let film;
    try {
        film = await fetchFilms(id)
        
    
    } catch(err) {
        console.log(error)
    }
    renderFilm(film)
}
   

    async function fetchCharacter(id) {
        let characterUrl = `${baseUrl}/characters/${id}`;
        return await fetch(characterUrl)
          .then(res => res.json())
      }
      
      async function fetchPlanet(film) {
        const url = `${baseUrl}/planets/${film?.homeworld}`;
        const planet = await fetch(url)
          .then(res => res.json())
        return planet;
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
    title.textContent = film?.title
    episode.textContent = film?.episode_id;
    director.textContent = film?.director
    producer.textContent = film?.producer




    
  }



