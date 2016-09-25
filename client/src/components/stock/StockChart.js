/* eslint-disable */
import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';

class StockChart extends React.Component {
  configChart() {
    if (this.props.stock.symbol !== undefined) {
      let data = { prices: [], dates: [] }

      this.props.stock.stockHistory.map(stock => {
        data.prices.push([parseInt(stock.Close)]);
        data.dates.push([stock.Date]);
      });

      const config = {
        title: {
          text: `${this.props.stock.Name}`
        },
        subtitle: {
          text: 'Using explicit breaks for nights and weekends'
        },

        xAxis: {
          categories: data.dates,
          breaks: [{
            from: Date.UTC(2011, 9, 6, 16),
            to: Date.UTC(2011, 9, 7, 8),
            repeat: 24 * 36e5
          }, {
            from: Date.UTC(2011, 9, 7, 16),
            to: Date.UTC(2011, 9, 10, 8),
            repeat: 7 * 24 * 36e5
          }]
        },
        rangeSelector: {
          buttons: [{
            type: 'hour',
            count: 1,
            text: '1h'
          }, {
            type: 'day',
            count: 1,
            text: '1D'
          }, {
            type: 'all',
            count: 1,
            text: 'All'
          }],
          selected: 1,
          inputEnabled: false
        },
        series: [{
          name: 'AAPL Stock Price',
          data: data.prices,
          type: 'area',
          threshold: null,
          tooltip: {
            valueDecimals: 2
          },
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.getOptions().colors[0]],
              [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
            ]
          }
        }],
        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        }
      }
      return <ReactHighcharts config={config}></ReactHighcharts>
    }
  }

  render() {
    return <div>{this.configChart()}</div>
  }
}

StockChart.propTypes = {
  stock: React.PropTypes.object.isRequired
}

export default StockChart;
