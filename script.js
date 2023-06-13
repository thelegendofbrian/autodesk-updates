// const urlParams = new URLSearchParams(window.location.search);
// const year = urlParams.get('year') || '2022'

// Get the div where the products will be displayed
const productsDiv = document.getElementById('products');

// URL of the endpoint
const url = "https://script.google.com/macros/s/AKfycbyAsnlDFFIuLL8ZK-qYIvxVwBXJnRQMrl32G7on_r88tg50E1ob8cbXIpp7749MDAdrPA/exec";
// const url = "https://script.google.com/macros/s/AKfycbyAsnlDFFIuLL8ZK-qYIvxVwBXJnRQMrl32G7on_r88tg50E1ob8cbXIpp7749MDAdrPA/exec?year=" + year;

// Use the Fetch API to GET the endpoint
// fetch(url, { mode: 'no-cors' })
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Loop through each item in the data array
        for(let item of data) {
            // Create a new div for the product
            let productDiv = document.createElement('div');
            productDiv.classList.add('product', 'col-lg-4', 'col-md-6', 'mb-4');

            // Create a new h2 for the product name
            let nameH2 = document.createElement('h2');
            nameH2.textContent = item.displayName;

            // Create a new p for the date
            let dateP = document.createElement('p');
            dateP.textContent = `Build ${item.prodBuild} - Released ${item.updateReleaseDate}`;

            // Create div for buttons
            let buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttons');

            // Create a new a for the download link
            let urlA = document.createElement('a');
            urlA.classList.add('download');
            urlA.textContent = 'Download';
            urlA.href = item.url;

            // Create a new a for the changelog link
            let urlB = document.createElement('a');
            urlB.classList.add('changes');
            urlB.textContent = 'Changes';
            urlB.href = item.relNotesUrl;
            urlB.title = item.longDesc;
            urlB.setAttribute('data-toggle', 'tooltip');
            urlB.setAttribute('data-placement', 'bottom');

            // Append the h2, p, and a to the appropriate divs
            productDiv.appendChild(nameH2);
            productDiv.appendChild(dateP);
            productDiv.appendChild(buttonsDiv);
            buttonsDiv.appendChild(urlA);
            buttonsDiv.appendChild(urlB);


            // Append the product div to the products div
            productsDiv.appendChild(productDiv);
        }
    })
    .catch(error => console.error(error));
