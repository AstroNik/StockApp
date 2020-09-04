package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	//Serve Other Routes Above PathPrefix
	router.HandleFunc("/findStock", findStock)
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./stock/build")))
	log.Fatal(http.ListenAndServe(":8080", router))
}

type Stock struct {
	//ID primitive.ObjectID `bson:"_id,omitempty"`
	Stock string `json:"stock"`
}

func findStock(w http.ResponseWriter, r *http.Request) {
	var stock Stock
	err := json.NewDecoder(r.Body).Decode(&stock)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	log.Printf("Find Stock %+v", stock)

	resp, err := http.Get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + stock.Stock + "&apikey=ZNIJUAPDSSCOJDE5")
	if err != nil {
		log.Fatal(err)
	}

	var stockData map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&stockData)
	if err != nil {
		log.Fatal(err)
	}

	delete(stockData, "Meta Data")
	var cleanedStockData interface{}
	cleanedStockData = stockData["Time Series (Daily)"]

	_ = json.NewEncoder(w).Encode(cleanedStockData)
}
