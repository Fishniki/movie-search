var userInput = document.getElementById('user-input');
var searchButton = document.getElementById('search-button');
var movieList = document.getElementById('movie-list');
var modal = document.getElementById('modal');
var modalContent = document.getElementById('modal-content');

function GetUserInput() {
    return userInput.value;
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();
    }
});

function GetFilm() {
    movieList.innerHTML = `
        <div class="flex h-screen justify-center items-center">
            <h2 class="text-2xl text-slate-700">Mohon Tunggu Sebentar...</h2>
        </div>
    `;

    var userSubmit = GetUserInput()
    if ( userSubmit === '') {
        movieList.innerHTML = `
            <p>Masukan judul film yang ingin anda cari</p>
        `;
        return;
    }

    var film = GetUserInput();
    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=6d07a68a&s=${film}`)
        .then((res) => res.json())
        .then((res) => {
            movieList.innerHTML = '';
            userInput.value = '';

            if (res.Response === "True") {
                var movies = res.Search;
                movies.forEach((movie) => {
                    movieList.innerHTML += `
                        <div onclick='ShowDetailMovie("${movie.imdbID}")' class="border m-2 w-[130px] cursor-pointer">
                            <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-auto">
                            <h3 class="text-center font-semibold">${movie.Title}</h3>
                        </div>
                    `;
                });
            } else {
                movieList.innerHTML = `<p class="text-red-500">Error fetching movie data</p>`;
            }
        });
}

async function ShowDetailMovie(imdbID) {
    var url = await (await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=6d07a68a`)).json();
    modal.style.display = 'flex';

    modalContent.innerHTML = `
        <h1 class="font-bold md:text-2xl text-center text-xl mb-5">${url.Title}</h1>
        <div class="lg:flex-row flex-col-reverse flex justify-center items-center">
            <div class="w-2/3 font-semibold text-xs sm:text-[15px] text-justify mt-5">
                <p>Rating: 10/10</p>
                <p>Nama Sutradara: ${url.Director}</p>
                <p>Genre: ${url.Genre}</p>
                <p>Rilis: ${url.Released}</p>
                <p>Durasi: ${url.Runtime}</p>
            </div>
            <img src="${url.Poster}" class='md:w-[200px] w-[130px]' alt="${url.Title}">
        </div>
    `;
}

function modalOut() {
    modal.style.display = 'none';
}
