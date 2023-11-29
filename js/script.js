const global = {
    currentPage: window.location.pathname,
};

//Display popular Movies
async function displayPopularMovies(){
    const {results} = await fetchAPIData('movies/popular');

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path ?
            `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
            />`
            :
            `<img
                src="images/no-image.jpeg"
                class="card-img-top"
                alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>`;

          document.querySelector('#popular-movies').appendChild(div);
    });
}

//Display popular Tv-Shows
async function displayPopularShows(){
    const {results} = await fetchAPIData('tv/popular');
    console.log(results);
    results.forEach(show => {
        // console.log(show);
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path ?
            `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.original_name}"
            />`
            :
            `<img
                src="images/no-image.jpeg"
                class="card-img-top"
                alt="${show.original_name}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.original_name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date
              }</small>
            </p>
          </div>`;

          document.querySelector('#popular-shows').appendChild(div);
    });
}

//fetch data from the TMDB API
async function fetchAPIData(endpoint){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDVkNzk2OTVmM2MyYzAyNmQyODI0MGZkYjYxOTA2NCIsInN1YiI6IjY1NjYxZjBjMTdiNWVmMDEwNTQ4ZDM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rs40domB8G7RrQIv60j00NE15iS9eVE_-zcoTLZ6dVA'
        }
      };
    showSpinner();
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}?language=en-US&page=1`, options);

    const data = await response.json();
    hideSpinner();
    return data;
}

//Highlight the active link
function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active')
        }
    });
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

//Init App
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('Tv Details');
            break;
        case '/search.html':
            console.log('Search');
            break;    
    }
    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);