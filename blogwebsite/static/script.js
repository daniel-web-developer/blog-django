console.log("VIVA CRISTO REY");

const search = document.querySelector('#search');
const select = document.querySelector('#select');
const articles = document.querySelector('#articles');

const urlAll = 'http://localhost:8000/api/articles/?format=json';
const urlOne = 'http://localhost:8000/api/article/';

function getAll(){
    const data = fetch(urlAll)
        .then((response) => response.json())
        .then((response) => rendering(response));

    console.log(data);
}

function rendering(props){
    let allArticles = props.map((article) => 
        `
        <div>
            <a href="{% url 'article' article.permalink %}" class="all-title">${article.title}</a>
            <p class="all-body">${article.content}</p>
        </div>
        `
    );

    articles.innerHTML = allArticles
}

search.addEventListener("keydown", (event) => {
    console.log(event.target.value);
    let searchValue = event.target.value;

    let filteredArticles = data.filter(article => article.title.toLowerCase().includes(searchValue));


})

getAll()
