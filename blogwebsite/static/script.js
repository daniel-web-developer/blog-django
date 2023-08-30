const articles = document.querySelector('#articles');
const search = document.querySelector('#search');
const select = document.querySelector('#select');
const onearticle = document.querySelector('#one-article');

const urlAll = '/api/articles/?format=json';

let apiData = null;
let searchValue = "";
let renderArticles = null;
let slug = window.location.pathname.split('/').slice(-1);

const urlOne = `http://localhost:8000/api/articles/${slug}?format=json`;

function fetchOne(url){
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderOne(data);
        });
}

function renderOne(data){
    renderArticles = ( 
        `
        <p class="article-title">${data.title}</p>
        <div class="flex article-mobile">
            <p class="article-date">Posted: ${data.date_posted}</p>
            <p>${data.date_edited == null ? "" : data.date_edited}</p>
        </div>
        <a href="/#about" class="article-author">${data.author}</a>
        <p class="article-body">${data.content}</p>
        `
    );
    onearticle.innerHTML = renderArticles;
}

if (slug != ""){
    fetchOne(urlOne);
}
else{
    fetchAll();
}

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
        sortedData = data.sort((a, b) => a.title - b.title ? 1 : -1);
    }
    else if (value == 4){
        sortedData = data.sort((a, b) => a.title - b.title ? -1 : 1);
    }

    renderData(sortedData);
}

function renderData(data){
    renderArticles = data.map((article) => 
        `
        <div>
        <div class="flex flex-alignit-c">
        <a href="/article/${article.permalink}" class="all-title">${article.title}</a> <p class="all-date">Posted: ${article.date_posted}</p>
        </div>
        <p class="all-body">${article.content.slice(0, 200)}...</p>
        </div>
        `
    );
    articles.innerHTML = renderArticles.join('');
}

