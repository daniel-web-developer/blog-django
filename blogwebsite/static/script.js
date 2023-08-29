const articles = document.querySelector('#articles');
const search = document.querySelector('#search');
const select = document.querySelector('#select');

const urlAll = 'http://localhost:8000/api/articles/?format=json';

let apiData = null;
let searchValue = "";
let renderArticles = null;

function fetchAll(){
    fetch(urlAll)
        .then(response => response.json())
        .then(data => {
            organiseData(data);
        });
}

function organiseData(apiData){

    let data = apiData;

    search.addEventListener("keyup", (event) => {
        console.log(select.value);
        searchValue = event.target.value;
        searchValue = searchValue.toLowerCase();
        data = apiData.filter(article => article.title.toLowerCase().includes(searchValue))
        sortData(data, select.value);
    })
    sortData(data, select.value);
}

function sortData(data, value){
    console.log(value);

    let sortedData = null;

    if (value == 1){
        sortedData = data.sort((a, b) => a.date_posted - b.date_posted ? -1 : 1);
    }
    else if (value == 2){
        sortedData = data.sort((a, b) => a.date_posted - b.date_posted ? 1 : -1);
    }
    else if (value == 3){
        sortedData = data.sort((a, b) => a.title - b.title ? -1 : 1);
    }
    else if (value == 4){
        sortedData = data.sort((a, b) => a.title - b.title ? 1 : -1);
    }

    renderData(sortedData);
}

function renderData(data){
    renderArticles = data.map((article) => 
        `
        <div>
        <a href="/article/${article.permalink}" class="all-title">${article.title}</a>
        <p class="all-body">${article.content}</p>
        </div>
        `
    );
    articles.innerHTML = renderArticles.join('');
}

fetchAll();

