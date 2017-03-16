import {Chart} from 'canvasjs';
import dateFormat from 'dateformat';

window.onload = () => {
  const giftrade = JSON.parse(document.querySelector('#giftrade').getAttribute('data'));
  const amaten = JSON.parse(document.querySelector('#amaten').getAttribute('data'));

  const chart = new Chart('chart', {
    title: {
      text: 'Rate'
    },
    data: [{
      type: 'area',
      dataPoints: giftrade.map((row) => {
        return {
          x: new Date(row.date),
          y: row.rate
        };
      })
    },{
      type: 'area',
      dataPoints: amaten.map((row) => {
        return {
          x: new Date(row.date),
          y: row.rate
        };
      })
    }],
    axisX: {
      labelFormatter: (e) => {
        return dateFormat(new Date(e.value), 'mm-dd HH:MM');
      },
      valueFormatString: 'MM-DD HH:mm'
    },
    axisY: {
      minimum: 80
    }
  });
  chart.render();
};
