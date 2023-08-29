const articles = document.querySelector('#articles');
const search = document.querySelector('#search');

const urlAll = 'http://localhost:8000/api/articles/?format=json';

let apiData = null;
let searchValue = "";
let renderArticles = null;

function fetchAll(){
    fetch(urlAll)
        .then(response => response.json())
        .then(data => {
            renderData(data);
        });
}

function renderData(apiData){

    renderArticles = apiData.map((article) => 
        `
        <div>
        <a href="{% url 'article' article.permalink %}" class="all-title">${article.title}</a>
        <p class="all-body">${article.content}</p>
        </div>
        `
    );
    articles.innerHTML = renderArticles;

    search.addEventListener("keydown", (event) => {
        searchValue = event.target.value;
        searchValue = searchValue.toLowerCase();
        data = apiData.filter(article => article.title.toLowerCase().includes(searchValue))
        renderArticles = data.map((article) => 
            `
            <div>
            <a href="{% url 'article' article.permalink %}" class="all-title">${article.title}</a>
            <p class="all-body">${article.content}</p>
            </div>
            `
        );
        articles.innerHTML = renderArticles;
    })

    }

fetchAll();

