const button = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");

const apiKey = "R79MX5MS4YCT0D83"; // your API key

button.addEventListener("click", function () {
    const stockSymbol = input.value.trim().toUpperCase();

    if (!stockSymbol) {
        resultDiv.innerHTML = "Please enter a stock symbol";
        return;
    }
   
    resultDiv.innerHTML = "Loading...";

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const stockData = data["Global Quote"];

            if (!stockData || Object.keys(stockData).length === 0) {
                resultDiv.innerHTML = "No data found";
                return;
            }

            const symbol = stockData["01. symbol"];
            const price = stockData["05. price"];

            resultDiv.innerHTML = `
                <h2>${symbol}</h2>
                <p>Price: ${price}</p>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = "Error fetching data";
            console.log(error);
        });
});

