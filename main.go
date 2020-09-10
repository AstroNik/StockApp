package main

import (
	"encoding/json"
	"fmt"
	"github.com/gocolly/colly"
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
		log.Print(err)
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	router := mux.NewRouter()
	//Serve Other Routes Above PathPrefix
	router.HandleFunc("/stock/api/findStock", findStock)
	router.HandleFunc("/stock/api/scrape", scrapeWeb)
	spa := spaHandler{staticPath: "./stock/build", indexPath: "index.html"}
	router.PathPrefix("/stock").Handler(http.StripPrefix("/stock", spa))

	svr := &http.Server{
		Handler:      router,
		Addr:         ":8080",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(svr.ListenAndServe())
}

type Options struct {
	//ID primitive.ObjectID `bson:"_id,omitempty"`
	Stock      string
	TimeSeries string
	Interval   string
	OutputSize string
}

func findStock(w http.ResponseWriter, r *http.Request) {
	var data Options
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Print(err)
		//log.Fatal(err)
	}
	log.Printf("Request Data %+v", data)

	var url = "https://www.alphavantage.co/query?"
	if data.TimeSeries == "TIME_SERIES_INTRADAY" {
		url = url + "function=" + data.TimeSeries + "&symbol=" + data.Stock + "&interval=" + data.Interval
		if data.OutputSize == "full" {
			url = url + "&outputsize=" + data.OutputSize
		}
	}
	if data.TimeSeries == "TIME_SERIES_DAILY" || data.TimeSeries == "TIME_SERIES_DAILY_ADJUSTED" {
		url = url + "function=" + data.TimeSeries + "&symbol=" + data.Stock
		if data.OutputSize == "full" {
			url = url + "&outputsize=" + data.OutputSize
		}
	}

	url = url + "&apikey=ZNIJUAPDSSCOJDE5"

	log.Print(url)

	resp, err := http.Get(url)
	if err != nil {
		log.Print(err)
		//log.Fatal(err)
	}

	var stockData map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&stockData)
	if err != nil {
		log.Print(err)
		//log.Fatal(err)
	}

	delete(stockData, "Meta Data")
	var cleanedStockData interface{}

	if data.TimeSeries == "TIME_SERIES_INTRADAY" {
		cleanedStockData = stockData["Time Series ("+data.Interval+")"]
	}
	if data.TimeSeries == "TIME_SERIES_DAILY" || data.TimeSeries == "TIME_SERIES_DAILY_ADJUSTED" {
		cleanedStockData = stockData["Time Series (Daily)"]
	}

	//fixedData := DataCleaner.ConvertData(cleanedStockData)

	log.Printf("Cleaned Stock Data %+v", cleanedStockData)

	_ = json.NewEncoder(w).Encode(cleanedStockData)
}

func scrapeWeb(w http.ResponseWriter, r *http.Request) {
	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL.String())
	})

	_ = c.Visit("https://news.google.com/search?q=TSLA")
}
