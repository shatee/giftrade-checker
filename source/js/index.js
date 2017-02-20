import {Chart} from 'canvasjs';
import dateFormat from 'dateformat';

window.onload = () => {
  const data = JSON.parse(document.querySelector('#data').getAttribute('data'));
  const chart = new Chart('chart', {
    title: {
      text: 'Rate'
    },
    data: [{
      type: 'area',
      dataPoints: data.map((row) => {
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
    }
  });
  chart.render();
};

