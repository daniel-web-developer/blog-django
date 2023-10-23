const articles = document.querySelector('#articles');
const search = document.querySelector('#search');
const select = document.querySelector('#select');
const onearticle = document.querySelector('#one-article');
const featured = document.querySelector('#featured');
const meta = document.querySelector('#metadata');

const urlAll = '/api/articles/?format=json';

let apiData = null;
let renderArticles = null;
let slug = window.location.pathname.split('/').slice(-1);
let fetchedData = null;

const urlOne = `/api/articles/${slug}?format=json`;

function fetchOne(url){
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderOne(data);
        });
}

function renderOne(data){
    let metad = (
        `
        <title>${data.title}</title>
        <meta name="description" property="og:description" content="${data.subtitle}">
        <meta name="keywords" content="${data.tags}">
        `
    );
    renderArticles = ( 
        `
        <p class="article-title">${data.title}</p>
        <div class="flex article-mobile">
        <p class="article-date">Posted: ${data.date_posted}</p>
        <p>${data.date_edited == null ? "" : "Edited: " + data.date_edited}</p>
        </div>
        <a href="/#about" class="article-author">Author: ${data.author}</a>
        <img src=${data.imagelink} class="article-image">
        <p class="article-sub">${data.subtitle}</p>
        <p class="article-body">${data.content}</p>
        `
    );
    metadata.outerHTML = metad;
    onearticle.innerHTML = renderArticles;
}

if (slug != ""){
    fetchOne(urlOne);
} else {
    apiData = fetch(urlAll)
        .then(response => response.json())
        .then(response => organiseData(response, search.value,select.value));

    apiData = fetch(urlAll)
        .then(response => response.json())
        .then(response => featuredArticles(response));
}

function featuredArticles(data){
    let firstArticle = data.filter(article => article.featured.includes("first"));
    let secondArticle = data.filter(article => article.featured.includes("second"));
    let thirdArticle = data.filter(article => article.featured.includes("third"));

    renderFeatured(firstArticle, secondArticle, thirdArticle);
}

function renderFeatured(first, second, third){
    firstArticle = first.map((article) =>
        `
        <a href="article/${article.permalink}" class="flex featured featured-first">
            <img src=${article.imagelink}>
            <div class="flex featured-first-overlay">
                <p class="featured-text">${article.title}</p>
            </div>
        </a>
            `
    );

    secondArticle = second.map((article) =>
        `
        <div class='flex flex-justcont-sb flex-dir-col'>
            <a href="article/${article.permalink}" class="featured featured-others">
                <img src=${article.imagelink}>
            <div class="flex featured-others-overlay">
                <p class="featured-text">${article.title}</p>
            </div>
            </a>
            `
    );

    thirdArticle = third.map((article) =>
        `
            <a href="article/${article.permalink}" class="featured featured-others">
                <img src=${article.imagelink}>
            <div class="flex featured-others-overlay">
                <p class="featured-text">${article.title}</p>
            </div>
            </a>
        </div>
            `
    );
    
    featured.innerHTML = firstArticle + secondArticle + thirdArticle;
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
        <a href="/article/${article.permalink}" class="all-box">
        <div>
        <p class="all-title">${article.title}</p> <p class="all-date">${article.date_posted}</p>
        </div>
        <p class="all-body">${article.subtitle}</p>
        </a>
        `
    );
    articles.innerHTML = renderArticles.join('');
}

