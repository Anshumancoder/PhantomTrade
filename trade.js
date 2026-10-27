import { activeUser } from "./userID";

const API_KEY = 'dbfnq89r01qiahua456gdbfnq89r01qiahua4570'
const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`) 

const stockSymbols = JSON.parse(localStorage.getItem(`stockList_${activeUser}`)) || ["APPLE"]

if (localStorage.getItem(`stockList_${activeUser}`)) {
    localStorage.setItem(`stockList_${activeUser}`, JSON.stringify(stockSymbols))
}

const stockContainer = document.getElementById("stockList")
const stockPrice = {}

stockSymbols.forEach(Symbol => {
    stockPrice[Symbol] = {price: 0, prevPrice: 0}
    const stockItem = document.createElement("div")
    stockItem.className = "stockItem"
    stockItem.id = `stock${Symbol}`
    stockItem.innerHTML = `
    <span class="stockSymbol">${Symbol}</span>
    <span id="price${Symbol}" class="stockPrice">give it a sec....</span>
    `
})

socket.addEventListener("open", () => {
    stockSymbols.forEach(Symbol => {
        socket.send(JSON.stringify({type: "subscribe", Symbol: Symbol}))
    })
})


function updateStockUI(Symbol, price, prevPrice) {
    const priceElement = document.getElementById(`price${Symbol}`) 
    
    if (!priceElement) return
    priceElement.textContent = `$${price.toFixed(2)}`

    if (prevPrice !== 0) {
        if (price > prevPrice) {
            priceElement.className = "stockPriceUp"
        } else if (price < prevPrice) {
            priceElement.className = "stockPriceDown"
        }
    }
}

socket.addEventListener("message", (event) => {
    const response = JSON.parse(event.data)

    if (response.type === "trade") {
        response.data.forEach(trade => {
            const Symbol = trade.s
            const currentPrice = trade.p

            if (stockPrice[Symbol]) {
                stockPrice[Symbol].prevPrice = stockPrice[Symbol].price
                stockPrice[Symbol].price = currentPrice

                updateStockUI(Symbol, stockPrice[Symbol].price, stockPrice[Symbol].prevPrice)
            }
        })
    }
})