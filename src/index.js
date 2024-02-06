import './css/styles.css';
// import Object from './object.js';

// business logic
function getGif(keyword) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if(this.status === 200) {
      displayGif(response, keyword);
    } else {
      displayError(this, keyword);
    }

  });

  request.open("GET", url, true);
  request.send();
}


// UI logic
function displayGif(apiResponse, keyword) {
  document.getElementById("result").innerText = `Keyword: ${keyword}`;
  document.getElementById("gifDisplay").setAttribute("src", apiResponse.data[0].images.fixed_height.url);
}

function displayError(request, keyword) {
  document.getElementById("result").innerText = `Error for keyword ${keyword}: ${request.status} ${(request.status === 401) ? "incorrect API Key": "incorrect URL"}`;
}


function handleSubmission(e) {
  e.preventDefault();
  const input = document.getElementById("gif").value;
  document.getElementById("gif").value = null;
  getGif(input);
}

window.addEventListener("load", function() {
  document.getElementById("search").addEventListener("submit", handleSubmission);
});

