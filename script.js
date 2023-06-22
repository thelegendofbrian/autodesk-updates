const urlParams = new URLSearchParams(window.location.search);
const year = urlParams.get('year') || '2022'

// Get the div where the products will be displayed
const productsDiv = document.getElementById('products');
const spinnerDiv = document.getElementById('spinner');

// URL of the endpoint
const url = "https://script.google.com/macros/s/AKfycbyAsnlDFFIuLL8ZK-qYIvxVwBXJnRQMrl32G7on_r88tg50E1ob8cbXIpp7749MDAdrPA/exec?year=" + year;

// Use the Fetch API to GET the endpoint
fetch(url)
    .then(response => response.json())
    .then(data => {
        if (!data.length) {
            // No updates found
            let noProducts = document.createElement('p');
            noProducts.textContent = "No updates found for specified year.";

            // Remove spinner
            spinnerDiv.remove();

            productsDiv.appendChild(noProducts);
        } else {
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

                // Superscripted NEW if date is recent enough
                let superNew = document.createElement('sup');
                superNew.textContent = ' NEW';
                
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

                if (isWithinLast30Days(item.updateReleaseDate)) {
                    dateP.appendChild(superNew);
                }
                
                // Remove spinner
                spinnerDiv.remove();
                
                // Append the product div to the products div
                productsDiv.appendChild(productDiv);
            }
        }
    })
    .catch(error => console.error(error));

    function isWithinLast30Days(dateStr) {
        // Parse the date string
        var givenDate = new Date(dateStr);
        var currentDate = new Date();
    
        // Get the date 30 days ago
        var date30DaysAgo = new Date();
        date30DaysAgo.setDate(currentDate.getDate() - 30);
    
        // Check if the given date is between the current date and the date 30 days ago
        return givenDate <= currentDate && givenDate >= date30DaysAgo;
    }