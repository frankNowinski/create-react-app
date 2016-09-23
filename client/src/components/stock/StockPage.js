import React from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';

class StockPage extends React.Component {
  renderChart() {
    if (this.props.stock.symbol !== undefined) {
      let data = this.props.stock.stockHistory.map(stock => {
        return [parseInt(stock.Close)]
      });

      let dates = this.props.stock.stockHistory.map(stock => {
        return [stock.Date];
      });


      const config = {
        title: {
          text: 'AAPL stock price by minute'
        },

        subtitle: {
          text: 'Using explicit breaks for nights and weekends'
        },

        xAxis: {
          categories: dates,
          breaks: [{ // Nights
            from: Date.UTC(2011, 9, 6, 16),
            to: Date.UTC(2011, 9, 7, 8),
            repeat: 24 * 36e5
          }, { // Weekends
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
          data: data,
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
        }]

        // series: [{
        //   name: 'AAPL',
        //   type: 'area',
        //   data: data,
        //   gapSize: 5,
        //   tooltip: {
        //     valueDecimals: 2
        //   },
        //   fillColor: {
        //     linearGradient: {
        //       x1: 0,
        //       y1: 0,
        //       x2: 0,
        //       y2: 1
        //     },
        //     stops: [
        //       [0, Highcharts.getOptions().colors[0]],
        //       [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        //     ]
        //   },
        //   plotOptions: {
        //     series: {
        //       marker: {
        //         enabled: true
        //       }
        //     }
        //   },
        //   threshold: null
        // }]
      }

      return <ReactHighcharts config={config}></ReactHighcharts>
    }
  }

  render() {
    return (
      <div>
        <h4>{this.props.stock.Name}</h4>

        {this.renderChart()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stock: state.currentStock
  }
}

export default connect(mapStateToProps)(StockPage);
