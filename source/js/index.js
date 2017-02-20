import {Chart} from 'canvasjs';

window.onload = () => {
  const data = JSON.parse(document.querySelector('#data').getAttribute('data'));
  const chart = Chart('chart', {
    title: {
      text: 'Rate'
    },
    data: [{
      type: 'area',
      dataPoints: data.map((row) => {
        return {
          x: row.date,
          y: row.rate
        };
      })
    }]
  });
};

