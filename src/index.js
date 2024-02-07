import './css/styles.css';
// import Object from './object.js';

// business logic
function getGif(keyword) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    displayGif(response,keyword);
  });

  request.open("GET", url, true);
  request.send();

}

function getTrending() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/trending?limit=5&api_key=${process.env.API_KEY}`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if(this.status === 200) {
      displayTrending(response);
    } else {
      displayError(this);
    }
  });

  request.open("GET", url, true);
  request.send();

}

function handleRandomSubmission() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    displayRandom(response);

  });

  request.open("GET", url, true);
  request.send();
}

// UI logic
function displayGif(apiResponse, keyword) {
  document.getElementById("result").innerText = `Keyword: ${keyword}`;
  document.getElementById("gifDisplay").setAttribute("src", apiResponse.data[0].images.original.url);
}

function displayError(request) {
  document.getElementById("result").innerText = `Error: ${request.status} ${(request.status === 401) ? "incorrect API Key": "incorrect URL"}`;
}

function displayTrending(apiResponse) {
  for(let i = 1; i <= 5; i++) {
    document.getElementById(`${i}`).setAttribute("src", apiResponse.data[i-1].images.original.url);
  }

}

function displayRandom(apiResponse) {
  document.getElementById("randomGifDisplay").setAttribute("src", apiResponse.data.images.original.url);
}

function handleSubmission(e) {
  e.preventDefault();
  const input = document.getElementById("gif").value;
  document.getElementById("gif").value = null;
  getGif(input);
}

document.getElementById("search").addEventListener("submit", handleSubmission);
getTrending();
document.getElementById("random").addEventListener("click", handleRandomSubmission);


