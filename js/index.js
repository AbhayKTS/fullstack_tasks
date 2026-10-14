const movies = [
  { name: "Inception", rating: 8.8 },
  { name: "The Dark Knight", rating: 9.0 },
  { name: "Interstellar", rating: 8.7 }
];

let editingIndex = null;

function renderMovies() {
  const list = document.getElementById("movieList");
  if (!list) return;

  list.innerHTML = "";

  movies.forEach((movie, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${movie.name} - ${movie.rating}</span>
      <button data-action="edit" data-index="${index}">Edit</button>
      <button data-action="delete" data-index="${index}">Delete</button>
    `;
    list.appendChild(li);
  });
}

function addOrUpdateMovie(movieName, rating) {
  if (editingIndex === null) {
    movies.push({ name: movieName, rating });
  } else {
    movies[editingIndex] = { name: movieName, rating };
    editingIndex = null;
  }
  renderMovies();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("movieForm");
  const movieNameInput = document.getElementById("movieName");
  const movieRatingInput = document.getElementById("movieRating");
  const submitButton = document.getElementById("submitMovie");
  const movieList = document.getElementById("movieList");

  if (!form || !movieList) return;

  renderMovies();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const movieName = movieNameInput.value.trim();
    const rating = Number(movieRatingInput.value);

    if (!movieName || Number.isNaN(rating)) {
      alert("Please enter a valid movie name and rating.");
      return;
    }

    addOrUpdateMovie(movieName, rating);
    form.reset();
    submitButton.textContent = "Add Movie";
  });

  movieList.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.matches("button")) return;

    const action = target.dataset.action;
    const index = Number(target.dataset.index);

    if (action === "delete") {
      movies.splice(index, 1);
      if (editingIndex === index) {
        editingIndex = null;
        submitButton.textContent = "Add Movie";
        form.reset();
      }
      renderMovies();
      return;
    }

    if (action === "edit") {
      const selectedMovie = movies[index];
      movieNameInput.value = selectedMovie.name;
      movieRatingInput.value = selectedMovie.rating;
      editingIndex = index;
      submitButton.textContent = "Update Movie";
    }
  });
});
