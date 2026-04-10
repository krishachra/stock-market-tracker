const apiKey = "R79MX5MS4YCT0D83";

const button = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");

const sortLowBtn = document.getElementById("sortLow");
const sortHighBtn = document.getElementById("sortHigh");
const filterHighBtn = document.getElementById("filterHigh");
const toggleBtn = document.getElementById("themeToggle");

let stocks = [];

// 🔍 SEARCH STOCK
button.addEventListener("click", function () {
    const stockSymbol = input.value.trim().toUpperCase();

    if (!stockSymbol) {
        alert("Enter stock symbol");
        return;
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const stockData = data["Global Quote"];

            if (!stockData || Object.keys(stockData).length === 0) {
                alert("No data found");
                return;
            }

            const stock = {
                symbol: stockData["01. symbol"],
                price: parseFloat(stockData["05. price"]),
                change: stockData["09. change"],
                changePercent: stockData["10. change percent"]
            };

            // ❌ Prevent duplicates
            const exists = stocks.find(s => s.symbol === stock.symbol);
            if (exists) {
                alert("Stock already added");
                return;
            }

            stocks.push(stock);
            displayStocks(stocks);
        });
});

// 🖥 DISPLAY FUNCTION
function displayStocks(stockArray) {
    resultDiv.innerHTML = "";

    stockArray.map(stock => {
        const div = document.createElement("div");
        div.classList.add("stock-card");

        div.innerHTML = `
            <h3>${stock.symbol}</h3>
            <p>💰 Price: $${stock.price.toFixed(2)}</p>
            <p>📊 Change: ${stock.change} (${stock.changePercent})</p>
        `;

        resultDiv.appendChild(div);
    });
}

// 🔽 SORT LOW → HIGH
sortLowBtn.addEventListener("click", () => {
    const sorted = [...stocks].sort((a, b) => a.price - b.price);
    displayStocks(sorted);
});

// 🔼 SORT HIGH → LOW
sortHighBtn.addEventListener("click", () => {
    const sorted = [...stocks].sort((a, b) => b.price - a.price);
    displayStocks(sorted);
});

// 🔍 FILTER (price > 100)
filterHighBtn.addEventListener("click", () => {
    const filtered = stocks.filter(stock => stock.price > 100);
    displayStocks(filtered);
});

// 🌙 DARK MODE
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});