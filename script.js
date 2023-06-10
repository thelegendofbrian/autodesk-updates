// Get the div where the products will be displayed
const productsDiv = document.getElementById('products');

// URL of the endpoint
const url = "https://script.google.com/macros/s/AKfycbyAsnlDFFIuLL8ZK-qYIvxVwBXJnRQMrl32G7on_r88tg50E1ob8cbXIpp7749MDAdrPA/exec";

// Use the Fetch API to GET the endpoint
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Loop through each item in the data array
        for(let item of data) {
            // Create a new div for the product
            let productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Create a new h2 for the product name
            let nameH2 = document.createElement('h2');
            nameH2.textContent = item.name;

            // Create a new p for the date
            let dateP = document.createElement('p');
            dateP.textContent = `Date: ${item.date}`;

            // Create a new a for the hyperlink
            let urlA = document.createElement('a');
            urlA.textContent = 'Download';
            urlA.href = item.url;

            // Append the h2, p, and a to the product div
            productDiv.appendChild(nameH2);
            productDiv.appendChild(dateP);
            productDiv.appendChild(urlA);

            // Append the product div to the products div
            productsDiv.appendChild(productDiv);
        }
    })
    .catch(error => console.error(error));
