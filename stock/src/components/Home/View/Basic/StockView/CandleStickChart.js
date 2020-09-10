import React, {Component} from "react";
import PropTypes from "prop-types";

import {Chart, ChartCanvas} from "react-stockcharts";
import {CandlestickSeries,} from "react-stockcharts/lib/series";
import {XAxis, YAxis} from "react-stockcharts/lib/axes";

import {discontinuousTimeScaleProvider} from "react-stockcharts/lib/scale";
import {fitWidth} from "react-stockcharts/lib/helper";
import {last} from "react-stockcharts/lib/utils";

class CandleStickChart extends Component {
    render() {
        const {data: initialData, width, ratio} = this.props;

        const xScaleProvider = discontinuousTimeScaleProvider
            .inputDateAccessor(d => d.date);
        const {
            data,
            xScale,
            xAccessor,
            displayXAccessor,
        } = xScaleProvider(initialData);
        const xExtents = [
            xAccessor(last(data)),
            xAccessor(data[data.length - 100])
        ];

        return (
            <ChartCanvas height={400}
                         ratio={ratio}
                         width={width}
                         margin={{left: 50, right: 50, top: 10, bottom: 30}}
                         type={"hybrid"}
                         seriesName="MSFT"
                         data={data}
                         xScale={xScale}
                         xAccessor={xAccessor}
                         displayXAccessor={displayXAccessor}
                         xExtents={xExtents}
            >

                <Chart id={1} yExtents={d => [d.high, d.low]}>
                    <XAxis axisAt="bottom" orient="bottom" ticks={6}/>
                    <YAxis axisAt="left" orient="left" ticks={5}/>
                    <CandlestickSeries/>
                </Chart>
            </ChartCanvas>
        );
    }
}

CandleStickChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
};

CandleStickChart.defaultProps = {
    type: "svg",
};
CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
