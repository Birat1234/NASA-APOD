const resultsNav = document.getElementById('resultsNav');
const favouritesNav = document.getElementById('favouratesNav');
const imageContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
const saveConfirm = document.querySelector('.save-confirmed');

//NASA api

const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favourates = {};

//Remove loader on loading content
function showContent(page) {
    window.scrollTo({ top:0, behavior: 'instant'});
    if (page === 'results') {
        resultsNav.classList.remove('hidden');
        favouritesNav.classList.add('hidden');
    } else {
        resultsNav.classList.add('hidden');
        favouritesNav.classList.remove('hidden');
    }
    loader.classList.add('hidden');
}

//Create DOM
function createDOM(page) {
    const currArray = page === 'results' ? resultsArray : Object.values(favourates);
    currArray.forEach((r)=> {
        // Adding Card container CSS to each element
         const card = document.createElement('div');
         card.classList.add('card');
         //Link
         const Link = document.createElement('a');
         Link.href = r.hdurl;
         //Title
         Link.title = 'View Full Image';
         Link.target = '_blank';
         //Image
         const image = document.createElement('img');
         image.src = r.url;
         image.alt = 'NASA Picture of the Day';
         image.loading = 'lazy';
         image.classList.add('card-img-top');
 
         //Card Body
         const cardBody = document.createElement('div');
         cardBody.classList.add('card-body');
         //Card Title
         const cardTitle = document.createElement('h5');
         cardTitle.classList.add('card-title');
         cardTitle.textContent = r.title;
         //Save Text
         const saveText = document.createElement('p');
         saveText.classList.add('clickable');
         if (page === 'results') {
            saveText.textContent = 'Add to Favourate';
            saveText.setAttribute('onclick', `saveFavourate('${r.url}')`);
         }else{
            saveText.textContent = 'Remove Favourate';
            saveText.setAttribute('onclick', `removeFavourate('${r.url}')`);
         }
 
         //Card Text
         const cardText = document.createElement('p');
         cardText.textContent = r.explanation;
         //Footer
         const footer = document.createElement('small');
         footer.classList.add('text-muted');
         //Date
         const date = document.createElement('strong');
         date.textContent = r.date;
         //Copyright
         const copyrightel = r.copyright === undefined ? '' : r.copyright;
         const Copyright = document.createElement('span');
         footer.textContent = `${copyrightel}`;
         //Append
         footer.append(date, Copyright);
         cardBody.append(cardTitle, saveText, cardText, footer);
         Link.appendChild(image);
         card.append(Link, cardBody);
         imageContainer.appendChild(card);
     });
}

//Update DOM
function updateDOM(page) {

    //Get favourites from localstorage
    if (localStorage.getItem('nasaInfo')) {
        favourates = JSON.parse(localStorage.getItem('nasaInfo'));
    }

    imageContainer.textContent = '';
    createDOM(page);
    showContent(page);
}

// Get pictures from NASA api
async function getNasaPictures() {
    loader.classList.remove('hidden');
    try {
        const response = await fetch(apiUrl)
        resultsArray = await response.json();
        updateDOM('results');
    } catch (error) {
       //Catch error here 
    }
}

//Add favourate section
function saveFavourate(p) {
    resultsArray.forEach((item) => {
        if (item.url.includes(p) && !favourates[p]) {
            favourates[p] = item;
            //Show Saved Confirmation
            saveConfirm.hidden = false;
            setTimeout(() =>{
                saveConfirm.hidden = true;
            }, 2000);
            //Save favourites in local Storage
            localStorage.setItem('nasaInfo', JSON.stringify(favourates));
        }
    });
}

//Remove favourate section
function removeFavourate(p) {
    if (favourates[p]) {
        delete favourates[p];
        //Set favourates in localStorage without p
        localStorage.setItem('nasaInfo', JSON.stringify(favourates));
        updateDOM('favourates');
    }
}

//On load
getNasaPictures();