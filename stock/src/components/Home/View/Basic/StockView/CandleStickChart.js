import React, {Component} from "react";

import {Chart, ChartCanvas} from "react-stockcharts";
import {CandlestickSeries,} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";

class CandleStickChart extends Component {
    render() {

        return (
            <ChartCanvas>
                <Chart>
                    <XAxis/>
                    <YAxis/>
                    <CandlestickSeries/>
                </Chart>
            </ChartCanvas>
        );
    }
}

export default CandleStickChart;
