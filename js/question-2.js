// Question 2
const BODY = document.body;
BODY.innerHTML = `<h1 style="text-align: center;">Games n stuff</h1>`;

// Making the container div
const CONTAINER = document.createElement("div");
CONTAINER.classList.add("container");
BODY.appendChild(CONTAINER);

// and something to animate I guess
const LOADER = document.createElement("div");
LOADER.classList.add("loading");
LOADER.innerHTML = "Loading";
CONTAINER.appendChild(LOADER);

const URL = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating";

fetch(URL)
  .then((response) => response.json())
  .then((data) => (CONTAINER.innerHTML += listObjects(data.results)))
  .catch((error) => {
    console.error(error);
    CONTAINER.innerHTML += `<div class="error">An error has occured. Refresh or something I guess</div>`;
  })
  .finally(() => CONTAINER.removeChild(document.querySelector(".loading")));

function listObjects(list) {
  let newHtml = "";
  for (let i in list) {
    if (i === "8") break;
    let object = list[i];
    newHtml += `
        <div class="game" style="background-color: ${i % 2 === 0 ? `darkslategrey; color: white` : "white"};">
            <h2>${object.name ? object.name : "Name Unknown"}</h2>
            <p><strong>Rating: ${object.rating ? object.rating : "Unknown"}</strong></p>
            <p>Number of tags: ${Array.isArray(object.tags) ? object.tags.length : object.tags ? "1" : "N/A"}</p>
        </div>`;
  }
  return newHtml;
}
