package DataCleaner

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"strings"
)

type BetterData struct {
	Date   string  `json:"date"`
	Open   float64 `json:"open"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Close  float64 `json:"close"`
	Volume int64   `json:"volume"`
}

func ConvertData(oldData interface{}) []BetterData {
	retData := make([]BetterData, 0)

	// convert interface to map[string]interface
	oldDataMap, ok := oldData.(map[string]interface{})
	if !ok {
		log.Printf("failed to convert oldData to map[string]interface{}")
		return retData
	}

	// loop through map (each key is a date string and value is an object of open/high/low/etc
	for dateStr, dataObj := range oldDataMap {
		var currBetterDataObj BetterData
		currBetterDataObj = getBetterDataObj(dataObj)
		currBetterDataObj.Date = dateStr

		retData = append(retData, currBetterDataObj)
	}

	return retData
}

func getBetterDataObj(dataObj interface{}) BetterData {
	var betterData BetterData

	// convert interface{} data to map[string]interace{} so we can process it
	dataObjMap, ok := dataObj.(map[string]interface{})
	if !ok {
		log.Printf("[getBetterDataObj] not ok conversion")
		return betterData
	}

	// loop through key-value pairs and convert
	for k, v := range dataObjMap {
		strArr := strings.Split(k, " ")
		if len(strArr) > 1 {
			switch strArr[1] {
			case "volume":
				betterData.Volume, _ = strconv.ParseInt(v.(string), 10, 64)
				break
			case "open":
				betterData.Open, _ = strconv.ParseFloat(v.(string), 64)
				break
			case "high":
				betterData.High, _ = strconv.ParseFloat(v.(string), 64)
				break
			case "low":
				betterData.Low, _ = strconv.ParseFloat(v.(string), 64)
				break
			case "close":
				betterData.Close, _ = strconv.ParseFloat(v.(string), 64)
				break
			}
		}
	}

	return betterData
}

type IncomingData struct {
	Open   float64 `json:"1. open"`
	High   float64 `json:"2. high"`
	Low    float64 `json:"3. low"`
	Close  float64 `json:"4. close"`
	Volume int     `json:"5. volume"`
}

type OutGoingData struct {
	Date   string  `json:"date"`
	Open   float64 `json:"open"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Close  float64 `json:"close"`
	Volume int     `json:"volume"`
}

func CleanedData(m map[string]interface{}) []OutGoingData {
	temp, err := json.Marshal(m)
	if err != nil {
		panic(err)
	}

	data := map[string]IncomingData{}
	if err := json.Unmarshal(temp, &data); err != nil {
		panic(err)
	}

	var data2 []OutGoingData
	for date, d1 := range data {
		var d2 OutGoingData
		d2.Date = date
		d2.Open = d1.Open
		d2.High = d1.High
		d2.Low = d1.Low
		d2.Close = d1.Close
		d2.Volume = d1.Volume
		data2 = append(data2, d2)
	}

	out, err := json.MarshalIndent(data2, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(out))
	return data2
}
