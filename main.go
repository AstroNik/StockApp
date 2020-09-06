package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	path = filepath.Join(h.staticPath, r.URL.Path)

	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	//Serve Other Routes Above PathPrefix
	router.HandleFunc("/api/findStock", findStock)
	spa := spaHandler{staticPath: "./stock/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)
	http.Handle("/stock", router)

	svr := &http.Server{
		Handler:      router,
		Addr:         ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(svr.ListenAndServe())
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
