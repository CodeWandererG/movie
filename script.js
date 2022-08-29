//Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

key = "905753cc";
//Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  //If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please enter a movie name</h3>`;
  }
  //If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        //If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="data:image/png;base64,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">
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
            
        `;
        }
        //If movie does NOT exists in database
        else {
          result.innerHTML = `<img class="haha" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr9jr_QbRB_7PVGMBbbTt1bEBOrXskTDdmXg&usqp=CAU"><h3 class='msg'>${data.Error}</h3>`;
        }
      })
      //If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);