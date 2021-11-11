
function searchShow(query) {
    const url = `https://api.tvmaze.com/search/shows?q=${query}`;
    fetch(url)
    .then(response => response.json())
    .then((jsonData) => {
        const results = jsonData.map(element => element.show.name);
        renderResults(results);
        document.getElementById("errorMessage").innerHTML = "";
    })
    .catch((error) => {
        document.getElementById("errorMessage").innerHTML = error;
        renderResults([]);
    }); 
}

function renderResults(results) {
    const list = document.getElementById("resultsList");
    list.innerHTML = "";
    results.forEach(result => {
        const element = document.createElement("div");
        element.innerText = result;
        list.appendChild(element);
    });
}

let searchTimeoutToken = 0;
window.onload = () => {
    const searchFieldElement = document.getElementById("ShowSearchFields");
    searchFieldElement.onkeyup = (event) => {

        clearTimeout(searchTimeoutToken);
        if(searchFieldElement.value.trim().length === 0) {
            return;
        }

        searchTimeoutToken = setTimeout(() => {
            searchShow(searchFieldElement.value);
        }, 250);
    };
}