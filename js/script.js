const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies(){
    const {results} = await fetchAPIData('movies/popular');

    results.forEach(movie => {
        console.log(movie);
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

//fetch data from the TMDB API
async function fetchAPIData(endpoint){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDVkNzk2OTVmM2MyYzAyNmQyODI0MGZkYjYxOTA2NCIsInN1YiI6IjY1NjYxZjBjMTdiNWVmMDEwNTQ4ZDM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Rs40domB8G7RrQIv60j00NE15iS9eVE_-zcoTLZ6dVA'
        }
      };
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);

    const data = await response.json();
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

//Init App
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
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