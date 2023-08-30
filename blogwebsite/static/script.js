const articles = document.querySelector('#articles');
const search = document.querySelector('#search');
const select = document.querySelector('#select');
const onearticle = document.querySelector('#one-article');

const urlAll = '/api/articles/?format=json';

let apiData = null;
let renderArticles = null;
let slug = window.location.pathname.split('/').slice(-1);
let fetchedData = null;

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
} else {
    apiData = fetch(urlAll)
        .then(response => response.json())
        .then(response => organiseData(response, search.value,select.value))
        .then(response => fetchedData = response);
}

function organiseData(data, searchValue, selectValue){
    dataFirst = data.filter(article => article.title.toLowerCase().includes(searchValue));

    let sortedData = null;

    if (selectValue == 1){
        sortedData = dataFirst.sort((a, b) => a.date_posted - b.date_posted ? -1 : 1);
    }
    else if (selectValue == 2){
        sortedData = dataFirst.sort((a, b) => a.date_posted - b.date_posted ? 1 : -1);
    }
    else if (selectValue == 3){
        sortedData = dataFirst.sort((a, b) => a.title.localeCompare(b.title));
    }
    else if (selectValue == 4){
        sortedData = dataFirst.sort((a, b) => b.title.localeCompare(a.title));
    }

    search.addEventListener("keyup", (event) => {
        searchValue = event.target.value.toLowerCase();
        selectValue = select.value;
        dataFirst = data.filter(article => article.title.toLowerCase().includes(searchValue));

        let sortedData = null;

        if (selectValue == 1){
            sortedData = dataFirst.sort((a, b) => a.date_posted - b.date_posted ? -1 : 1);
        }
        else if (selectValue == 2){
            sortedData = dataFirst.sort((a, b) => a.date_posted - b.date_posted ? 1 : -1);
        }
        else if (selectValue == 3){
            sortedData = dataFirst.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (selectValue == 4){
            sortedData = dataFirst.sort((a, b) => b.title.localeCompare(a.title));
        }
        renderData(sortedData);
    })

    select.addEventListener("input", (event) => {
        searchValue = search.value.toLowerCase();
        selectValue = event.target.value;
        console.log(selectValue);

        dataFirst = data.filter(article => article.title.toLowerCase().includes(searchValue));

        let sortedData = null;

        if (selectValue == 1){
            sortedData = dataFirst.sort((a, b) => a.date_posted - b.date_posted ? -1 : 1);
        }
        else if (selectValue == 2){
            sortedData = dataFirst.sort((a, b) => a.date_posted - b.date_posted ? 1 : -1);
        }
        else if (selectValue == 3){
            sortedData = dataFirst.sort((a, b) => a.title.localeCompare(b.title));
        }
        else if (selectValue == 4){
            sortedData = dataFirst.sort((a, b) => b.title.localeCompare(a.title));
        }
        renderData(sortedData);
    })

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

